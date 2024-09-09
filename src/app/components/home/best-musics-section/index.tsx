import Image from "next/image";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";

export function BestMusicsSection() {
  return (
    <section className="w-full md:min-h-screen py-32 md:py-0 flex flex-col items-center justify-center bg-black relative">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full z-0 object-cover opacity-40"
        alt=""
        quality={100}
      />
      <div className="w-fit flex flex-col items-center justify-center text-center z-10">
        <h3 className="font-bold text-5xl md:text-8xl tracking-wider">THE BEST MUSICS</h3>
        <div className="flex flex-row justify-around w-full text-sm md:text-base">
          <p className="font-bold">IT</p>
          <p className="font-bold">HITS</p>
          <p className="font-bold">DIFFERENT</p>
        </div>
        <h3 className="font-bold text-5xl md:text-8xl tracking-wider">FOR YOUR IDEAS</h3>
      </div>
    </section>
  );
}
