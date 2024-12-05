"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { getArtistData } from "@/services/firebase/artist/get-artist-data";
import { getMusicData } from "@/services/firebase/music/get-musics";
import { removeCartItem } from "@/services/firebase/cart/Delete";

import { CartItem } from "@/app/types/cart-item";
import { Music } from "@/app/types/music";
import { Artist } from "@/app/types/artist";

import { MinusCircle } from "@phosphor-icons/react";

interface CartItemProps {
  item: CartItem | null;
}

export function CartItemComponent({ item }: CartItemProps) {
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [musicData, setMusicData] = useState<Music | null>(null);

  async function handleGetArtistData() {
    const result = await getArtistData({ artist_id: musicData?.artist_id! });
    setArtistData(result);
  }

  async function handleGetMusicData() {
    const result = await getMusicData({ music_id: item?.item_id! });
    setMusicData(result);
  }

  async function handleRemoveCartItem() {
    if (item?.item_id) {
      const promise = () => {
        return new Promise(async (resolve, reject) => {
          try {
            await removeCartItem({ item_id: item?.cart_item_doc_id! });

            resolve(true);
          } catch (error) {
            console.error(error);

            reject(error);
          }
        });
      };

      toast.promise(promise, {
        pending: "Removendo item do carrinho...",
        success: "Item removido com sucesso!",
        error: "Houve um erro ao remover o item do carrinho.",
      });
    }
  }

  useEffect(() => {
    if (item?.item_id) {
      handleGetMusicData();
    }
  }, [item]);

  useEffect(() => {
    if (musicData?.artist_id) {
      handleGetArtistData();
    }
  }, [musicData]);

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2">
        <Image
          className="w-40 h-40 object-cover object-center rounded-lg"
          src={musicData?.music_image || "https://placehold.co/160x160/png"}
          width={160}
          height={160}
          alt="Music card image"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl">{musicData?.music_name}</h2>
          <p>{artistData?.artist_name}</p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2">
        <p className="text-xl">R$ {musicData?.price}</p>
        <button
          onClick={handleRemoveCartItem}
          title="Remover do carrinho"
          className="text-blue-600 hover:text-blue-600/70 transition-colors duration-300"
        >
          <MinusCircle size={32} />
        </button>
      </div>
    </div>
  );
}
