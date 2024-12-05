"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { getArtistData } from "@/services/firebase/artist/get-artist-data";

import { Music } from "@/app/types/music";
import { Artist } from "@/app/types/artist";

import { CheckCircle } from "@phosphor-icons/react";

interface MusicListCardProps {
  music: Music;
  index: number;
}

export function MusicListCard({ music, index }: MusicListCardProps) {
  const [artistData, setArtistData] = useState<Artist | null>(null);

  async function handleGetArtistData() {
    const result = await getArtistData({ artist_id: music.artist_id });
    setArtistData(result);
  }

  useEffect(() => {
    if (music.artist_id) {
      handleGetArtistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-row w-[70%]">
        <div className="flex flex-row gap-2 items-center">
          {index + 1}
          <Image
            className="w-20 h-20 object-cover object-center"
            src={music.music_image || "https://placehold.co/80x80/png"}
            width={80}
            height={80}
            alt="Music image"
          />
          <div className="flex flex-col">
            <p>{music.music_name}</p>
            <p className="text-slate-300">{artistData?.artist_name}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-[20%] justify-end">
        <CheckCircle size={34} className="text-blue-600" />
      </div>
    </div>
  );
}
