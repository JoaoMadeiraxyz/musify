import Image from "next/image";

import { Music } from "@/app/types/music";

import { Basket } from "@phosphor-icons/react";

interface MusicCardProps {
  music: Music;
}

export function MusicCard({ music }: MusicCardProps) {
  return (
    <div className="w-72 h-40 group relative">
      <Image
        alt="Music image"
        src={music.music_image}
        width={288}
        height={160}
        className="w-full h-full object-cover object-center rounded-lg"
      />
      <button
        title="Adicionar ao carrinho"
        className="absolute top-2 right-2 bg-white hover:bg-white/70 p-1 rounded-md text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <Basket size={20} />
      </button>
      <div className="absolute bottom-0 left-0 bg-black/60 h-9 w-full flex items-center text-white px-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        {music.music_name}
      </div>
    </div>
  );
}
