"use client";

import Image from "next/image";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";

import { Category } from "../../category";

export function CatalogCategories() {
  return (
    <section className="w-full flex flex-col relative pl-24 py-20">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40"
        alt=""
        quality={100}
      />

      <div className="w-full z-10 flex flex-col gap-14">
        <Category text="Mais Populares" />
      </div>
    </section>
  );
}
