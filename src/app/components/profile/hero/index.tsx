"use client";

import Image from "next/image";

import { UploadUserImageModal } from "../../upload-user-image-modal";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";

import { DotsThree } from "@phosphor-icons/react";

import { User } from "@/app/types/user";

type ProfileHeroProps = {
  user: User | null;
};

export function ProfileHero({ user }: ProfileHeroProps) {
  return (
    <section className="w-full flex flex-col relative px-8 md:px-36 py-28">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40 select-none"
        alt=""
        quality={100}
      />
      <div className="flex flex-row w-full justify-between z-10">
        <div className="flex flex-row gap-5">
          <UploadUserImageModal user={user} />
          <div className="flex flex-col gap-5">
            <span>Perfil</span>
            <h1 className="text-8xl font-bold truncate whitespace-nowrap max-w-[250px] md:max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px]">
              {user?.username}
            </h1>
          </div>
        </div>
        <div>
          <DotsThree size={48} weight="bold" color="#ffffff" />
        </div>
      </div>
    </section>
  );
}
