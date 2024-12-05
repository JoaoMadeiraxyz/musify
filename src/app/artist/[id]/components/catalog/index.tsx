"use client";

import Image from "next/image";

import backgroundTexture from "../../../../../../public/images/texture/bg-texture.png";

import { Category } from "@/app/components/category";

import { Music } from "@/app/types/music";

interface CatalogProps {
  musics: Music[] | null;
}

export function Catalog({ musics }: CatalogProps) {
  return (
    <section className="w-full flex flex-col relative pl-8 md:pl-24 py-20">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40"
        alt=""
        quality={100}
      />

      <div className="w-full z-10 flex flex-col gap-5 md:gap-14">
        <Category text="Músicas" musics={musics} />
      </div>
    </section>
  );
}
