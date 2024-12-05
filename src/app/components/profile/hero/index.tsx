"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Popover from "@radix-ui/react-popover";
import { toast } from "react-toastify";

import { UploadUserImageModal } from "../../upload-user-image-modal";

import backgroundTexture from "../../../../../public/images/texture/bg-texture.png";

import { DotsThree } from "@phosphor-icons/react";

import { User } from "@/app/types/user";

import { createArtistProfile } from "@/services/firebase/artist/create";
import {
  inactivateArtistProfile,
  reactivateArtistProfile,
} from "@/services/firebase/artist/update";

type ProfileHeroProps = {
  user: User | null;
};

export function ProfileHero({ user }: ProfileHeroProps) {
  const [open, setOpen] = useState(false);

  async function handleActivateArtistProfile() {
    if (user) {
      if (user.artist_id) {
        const promise = () => {
          return new Promise(async (resolve, reject) => {
            try {
              await reactivateArtistProfile({
                artist_id: user.artist_id!,
                user_id: user.user_id,
              });

              resolve(true);
            } catch (error) {
              console.error(error);

              reject(error);
            }
          });
        };

        toast.promise(promise, {
          pending: "Ativando perfil de artista...",
          success: "Perfil de artista ativado com sucesso!",
          error: "Houve um erro ao ativar o perfil de artista.",
        });
      } else {
        const promise = () => {
          return new Promise(async (resolve, reject) => {
            try {
              await createArtistProfile({
                user_id: user?.user_id,
                artist_name: user.username,
              });

              resolve(true);
            } catch (error) {
              console.error(error);

              reject(error);
            }
          });
        };

        toast.promise(promise, {
          pending: "Ativando perfil de artista...",
          success: "Perfil de artista ativado com sucesso!",
          error: "Houve um erro ao ativar o perfil de artista.",
        });
      }
    }
  }

  async function handleInactivateArtistProfile() {
    if (user) {
      if (user.artist_id) {
        const promise = () => {
          return new Promise(async (resolve, reject) => {
            try {
              await inactivateArtistProfile({
                artist_id: user.artist_id!,
                user_id: user.user_id,
              });

              resolve(true);
            } catch (error) {
              console.error(error);

              reject(error);
            }
          });
        };

        toast.promise(promise, {
          pending: "Desativando perfil de artista...",
          success: "Perfil de artista desativado com sucesso!",
          error: "Houve um erro ao desativar o perfil de artista.",
        });
      }
    }
  }

  return (
    <section className="w-full flex flex-col relative px-8 md:px-36 py-28 min-h-[50vh]">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40 select-none"
        alt=""
        quality={100}
      />
      <div className="flex flex-row w-full justify-between z-10">
        <div className="flex flex-row gap-5">
          <UploadUserImageModal user={user} />
          <div className="flex flex-col gap-5">
            <span>Perfil</span>
            <h1 className="text-8xl font-bold truncate whitespace-nowrap max-w-[250px] md:max-w-[500px] xl:max-w-[800px] 2xl:max-w-[1000px]">
              {user?.username}
            </h1>
          </div>
        </div>
        <div>
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button>
                <DotsThree size={48} weight="bold" color="#ffffff" />
              </button>
            </Popover.Trigger>
            <Popover.Content className="flex flex-col gap-2 bg-black border rounded-lg border-slate-900 px-3 py-2 max-w-[250px]">
              {user?.type === "artist" && user?.artist_id && (
                <Link
                  className="transition-colors duration-300 hover:text-slate-400 p-1"
                  href={`/artist/${user.artist_id}`}
                >
                  Visitar perfil de artista
                </Link>
              )}

              {user?.type === "user" ? (
                <button
                  onClick={handleActivateArtistProfile}
                  className="w-full transition-colors duration-300 hover:text-slate-400 p-1"
                >
                  Ativar perfil de artista
                </button>
              ) : (
                <button
                  onClick={handleInactivateArtistProfile}
                  className="w-full transition-colors duration-300 hover:text-slate-400 p-1"
                >
                  Desativar perfil de artista
                </button>
              )}
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>
    </section>
  );
}
