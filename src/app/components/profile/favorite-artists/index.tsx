import Image from "next/image";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";

export function FavoriteArtists() {
  return (
    <section className="w-full flex flex-col relative px-8 md:px-24 py-20">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40 select-none"
        alt=""
        quality={100}
      />
      <div className="flex flex-col gap-10 z-10">
        <div className="flex w-full justify-between">
          <h3 className="text-2xl">Artistas favoritos</h3>
          <button className="text-2xl text-slate-300">Ver todos</button>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col items-center">
            <div className="w-fit flex flex-col gap-3">
              <Image
                className="w-52 h-52 rounded-full object-cover object-center"
                src={"https://placehold.co/208x208/png"}
                width={208}
                height={208}
                alt="Artist profile image"
              />
              <p>Artist name</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-fit flex flex-col gap-3">
              <Image
                className="w-52 h-52 rounded-full object-cover object-center"
                src={"https://placehold.co/208x208/png"}
                width={208}
                height={208}
                alt="Artist profile image"
              />
              <p>Artist name</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-fit flex flex-col gap-3">
              <Image
                className="w-52 h-52 rounded-full object-cover object-center"
                src={"https://placehold.co/208x208/png"}
                width={208}
                height={208}
                alt="Artist profile image"
              />
              <p>Artist name</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-fit flex flex-col gap-3">
              <Image
                className="w-52 h-52 rounded-full object-cover object-center"
                src={"https://placehold.co/208x208/png"}
                width={208}
                height={208}
                alt="Artist profile image"
              />
              <p>Artist name</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-fit flex flex-col gap-3">
              <Image
                className="w-52 h-52 rounded-full object-cover object-center"
                src={"https://placehold.co/208x208/png"}
                width={208}
                height={208}
                alt="Artist profile image"
              />
              <p>Artist name</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
