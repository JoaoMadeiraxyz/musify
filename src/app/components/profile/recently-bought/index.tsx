import Image from "next/image";

import { MusicsList } from "../../musics-list";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";

export function RecentlyBought() {
  return (
    <section className="w-full flex flex-col relative px-8 md:px-24 py-20">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40 select-none"
        alt=""
        quality={100}
      />

      <div className="flex flex-col gap-10 z-10">
        <div className="flex w-full justify-between">
          <h3 className="text-2xl">Adquirido recentemente</h3>
          <button className="text-2xl text-slate-300">Ver todos</button>
        </div>
        <MusicsList />
      </div>
    </section>
  );
}
