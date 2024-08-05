import Image from "next/image";
import Link from "next/link";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";
import promotionalImage from "../../../../../public/images/home/promotional-image.png";

export function BuyFromTheBest() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-black relative px-16">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full z-0 object-fill opacity-40"
        alt=""
        quality={100}
      />
      <div className="w-full z-10 flex flex-row justify-center gap-5 h-fit">
        <Image
          src={promotionalImage}
          alt=""
          quality={100}
          className="max-w-3xl"
        />
        <div className="flex flex-col justify-between max-w-2xl">
          <h2 className="font-bold text-6xl">
            BUY FROM THE BEST <span className="text-blue-600">ARTISTS</span>
          </h2>
          <Link href="./catalog" className="bg-white text-black px-6 py-1 rounded-md w-fit font-bold text-2xl">
            Check musics now
          </Link>
        </div>
      </div>
    </section>
  );
}
