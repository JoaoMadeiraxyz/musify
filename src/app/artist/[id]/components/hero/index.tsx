import Image from "next/image";
import Link from "next/link";

import { Button } from "@/app/components/button";
import { UploadArtistBannerModal } from "@/app/components/upload-artist-banner";

import { CaretDoubleRight, PlusCircle } from "@phosphor-icons/react/dist/ssr";

import { User } from "@/app/types/user";
import { Artist } from "@/app/types/artist";

type heroProps = {
  user: User | null;
  artist_data: Artist | null;
};

export function Hero({ user, artist_data }: heroProps) {
  return (
    <section className="flex flex-col min-h-[80vh] w-full relative bg-black">
      <Image
        alt="background image"
        src={artist_data?.profile_banner || "https://placehold.co/1920x757/png"}
        width={1920}
        height={757}
        quality={100}
        className="w-full absolute top-0 left-0 pointer-events-none z-0 opacity-90 object-cover object-center h-full"
      />
      <div className="flex flex-col justify-end h-full w-full pb-28 absolute top-0 left-0 z-10 px-8 lg:px-24">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h2 className="text-white tracking-wider font-bold text-4xl lg:text-5xl">
              {artist_data?.artist_name}
            </h2>
          </div>

          {user?.artist_id !== artist_data?.artist_id ? (
            <div className="flex  gap-5 items-center justify-center w-fit">
              <Link href={"/catalog"}>
                <Button
                  className="bg-white/40 text-white font-bold"
                  text="Ver outros"
                  icon={
                    <CaretDoubleRight
                      size={20}
                      weight="fill"
                      className="min-w-[20px] min-h-[20px]"
                    />
                  }
                />
              </Link>
            </div>
          ) : (
            <div className="flex  gap-5 items-center justify-center w-fit">
              <Link href="/artist/enviar-musica">
                <Button
                  className="bg-white text-black tracking-wide"
                  text="Adicionar Música"
                  icon={
                    <PlusCircle
                      size={20}
                      className="min-w-[20px] min-h-[20px]"
                    />
                  }
                />
              </Link>

              <UploadArtistBannerModal artist={artist_data} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
