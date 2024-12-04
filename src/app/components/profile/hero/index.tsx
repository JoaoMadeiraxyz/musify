"use client";

import Image from "next/image";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";

import { DotsThree } from "@phosphor-icons/react";

export function ProfileHero() {
  return (
    <section className="w-full flex flex-col relative px-8 md:px-36 py-28">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40"
        alt=""
        quality={100}
      />
      <div className="flex flex-row w-full justify-between z-10">
        <div className="flex flex-row gap-5">
          <Image
            className="w-64 h-64 rounded-full object-cover object-center"
            src={"https://placehold.co/256x256/png"}
            width={256}
            height={256}
            alt="User profile image"
          />
          <div className="flex flex-col gap-5">
            <span>Perfil</span>
            <h1 className="text-8xl font-bold">João</h1>
          </div>
        </div>
        <div>
          <DotsThree size={48} weight="bold" color="#ffffff" />
        </div>
      </div>
    </section>
  );
}
