import Image from "next/image";

import heroImage from "../../../../../public/images/home/hero-background.png";

import { ArrowCircleDown } from "@phosphor-icons/react/dist/ssr";

export function HeroSection() {
  return (
    <section className="flex flex-col md:min-h-screen w-full relative bg-black">
      <Image
        alt="background image of a band"
        src={heroImage}
        className="w-full h-full absolute top-0 right-0 pointer-events-none z-0 opacity-90 object-cover object-center"
      />
      <div className="flex flex-col min-h-screen justify-center items-center z-10">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl md:text-9xl font-bold font-lexend tracking-widest">
            MUSIFY
          </h1>
          <p className="text-lg md:text-2xl">Give sound to your ideas</p>
        </div>
      </div>

      <div className="absolute w-full bottom-5 flex flex-col items-center z-10">
        <button className="w-fit flex items-center text-center flex-col">
          <ArrowCircleDown size={48} />
          <p>See more</p>
        </button>
      </div>
    </section>
  );
}
