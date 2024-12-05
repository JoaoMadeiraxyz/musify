import { MusicCard } from "../music-card";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Music } from "@/app/types/music";

interface CategoryProps {
  text: string;
  musics: Music[] | null;
}

export function Category({ text, musics }: CategoryProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl">{text}</h3>
      <div className="flex gap-8">
        <Swiper
          spaceBetween={30}
          breakpoints={{
            2560: {
              width: 2560,
              slidesPerView: 7,
            },
            1440: {
              width: 1440,
              slidesPerView: 4,
            },
            1024: {
              width: 1024,
              slidesPerView: 3,
            },
            768: {
              width: 768,
              slidesPerView: 2.5,
            },
            320: {
              width: 320,
              slidesPerView: 1.1,
            },
          }}
        >
          {musics?.map((music) => (
            <SwiperSlide key={music.music_id}>
              <MusicCard music={music} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
