import { MusicListCard } from "../music-list-card";

import { Music } from "@/app/types/music";

interface MusicLisProps {
  musics: Music[] | null;
}

export function MusicsList({ musics }: MusicLisProps) {
  return (
    <div className="flex flex-col gap-6">
      {musics?.map((music, index) => (
        <MusicListCard key={music.music_id} music={music} index={index} />
      ))}

      {(!musics || musics.length === 0) && (
        <p>Você ainda não adquiriu nada...</p>
      )}
    </div>
  );
}
