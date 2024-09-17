import { MusicCard } from "../music-card";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface CategoryProps {
  text: string;
}

export function Category({ text }: CategoryProps) {
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
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
          <SwiperSlide>
            <MusicCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
