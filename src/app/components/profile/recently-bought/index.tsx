"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { MusicsList } from "../../musics-list";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";

import { getMusicData } from "@/services/firebase/music/get-musics";

import { SaleItem } from "@/app/types/sale-item";
import { Music } from "@/app/types/music";

interface RecentlyBoughtProps {
  sales: SaleItem[] | null;
}

export function RecentlyBought({ sales }: RecentlyBoughtProps) {
  const [musics, setMusics] = useState<Music[] | null>(null);

  async function handleGetMusicsData() {
    if (sales && sales.length > 0) {
      const data: Music[] = [];

      await Promise.all(
        sales.map(async (sale) => {
          const music = await getMusicData({ music_id: sale.item_id });

          if (music) {
            data.push(music);
          }
        })
      );

      setMusics(data);
    }
  }

  useEffect(() => {
    if (sales) {
      handleGetMusicsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sales]);

  return (
    <section className="w-full flex flex-col relative px-8 md:px-24 py-20 min-h-[50vh]">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40 select-none"
        alt=""
        quality={100}
      />

      <div className="flex flex-col gap-10 z-10">
        <div className="flex w-full justify-between">
          <h3 className="text-2xl">Adquiridos</h3>
        </div>
        <MusicsList musics={musics} />
      </div>
    </section>
  );
}
