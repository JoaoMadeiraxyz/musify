import Image from "next/image";

import { Music } from "@/app/types/music";

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
      <div className="absolute bottom-0 left-0 bg-black/60 h-9 w-full flex items-center text-white px-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        {music.music_name}
      </div>
    </div>
  );
}
