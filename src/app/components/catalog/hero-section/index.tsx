import Image from "next/image";

import heroImage from "../../../../../public/images/catalog/hero-background.png";

import { Button } from "../../button";

import { ToteSimple, CaretDoubleRight } from "@phosphor-icons/react/dist/ssr";

export function HeroSection() {
  return (
    <section className="flex flex-col min-h-[80vh] w-full relative bg-black">
      <Image
        alt="background image"
        src={heroImage}
        quality={100}
        className="w-full absolute top-0 left-0 pointer-events-none z-0 opacity-90 object-cover object-center h-full"
      />
      <div className="flex flex-col justify-end h-full w-full pb-28 absolute top-0 left-0 z-10 px-8 lg:px-24">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <span className="text-blue-500 font-bold lg:text-xl">Novo</span>
            <h2 className="text-white tracking-wider font-bold text-4xl lg:text-5xl">
              CHIHIRO
            </h2>
            <p className="text-white tracking-wider xl:text-xl">BILLIE EILISH</p>
          </div>

          <div className="flex  gap-5 items-center justify-center w-fit">
            <Button
              className="bg-white text-black tracking-wide"
              text="Adquirir"
              icon={
                <ToteSimple
                  size={20}
                  weight="fill"
                  className="min-w-[20px] min-h-[20px]"
                />
              }
            />

            <Button
              className="bg-white/40 text-white font-bold"
              text="Ver mais"
              icon={
                <CaretDoubleRight
                  size={20}
                  weight="fill"
                  className="min-w-[20px] min-h-[20px]"
                />
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
