"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../../button";

import { Basket, CaretDoubleRight } from "@phosphor-icons/react/dist/ssr";

import { listArtistMusics } from "@/services/firebase/music/get-musics";

import { Artist } from "@/app/types/artist";
import { Music } from "@/app/types/music";

interface HeroSectionProps {
  artist: Artist | null;
}

export function HeroSection({ artist }: HeroSectionProps) {
  const [musics, setMusics] = useState<Music[] | null>(null);

  async function handleGetArtistMusics() {
    const result = await listArtistMusics({ artist_id: artist?.artist_id! });
    setMusics(result);
  }

  useEffect(() => {
    if (artist?.artist_id) {
      handleGetArtistMusics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artist]);

  return (
    <section className="flex flex-col min-h-[80vh] w-full relative bg-black">
      <Image
        alt="background image"
        src={artist?.profile_banner || "https://placehold.co/1920x757/png"}
        width={1920}
        height={757}
        quality={100}
        className="w-full absolute top-0 left-0 pointer-events-none z-0 opacity-90 object-cover object-center h-full"
      />
      <div className="flex flex-col justify-end h-full w-full pb-28 absolute top-0 left-0 z-10 px-8 lg:px-24">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <span className="text-blue-500 font-bold lg:text-xl">Novo</span>
            <h2 className="text-white tracking-wider font-bold text-4xl lg:text-5xl">
              {musics ? musics[0].music_name : null}
            </h2>
            <p className="text-white tracking-wider xl:text-xl">
              {artist?.artist_name}
            </p>
          </div>

          <div className="flex  gap-5 items-center justify-center w-fit">
            <Button
              className="bg-white text-black tracking-wide"
              text="Adquirir"
              icon={
                <Basket
                  size={20}
                  weight="fill"
                  className="min-w-[20px] min-h-[20px]"
                />
              }
            />

            <Link href={`/artist/${artist?.artist_id}`}>
              <Button
                className="bg-white/40 text-white font-bold"
                text="Ver mais"
                icon={
                  <CaretDoubleRight
                    size={20}
                    weight="fill"
                    className="min-w-[20px] min-h-[20px]"
                  />
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
