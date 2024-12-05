"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { toast } from "react-toastify";

import { uploadArtistBanner } from "@/services/firebase/artist/upload-artist-banner";

import { Artist } from "@/app/types/artist";

import { PencilSimple } from "@phosphor-icons/react";

type UploadArtistBannerProps = {
  artist: Artist | null;
};

export function UploadArtistBannerModal({ artist }: UploadArtistBannerProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  async function handleUploadUserImage() {
    if (file && artist) {
      const promise = () => {
        return new Promise(async (resolve, reject) => {
          try {
            await uploadArtistBanner({
              file: file,
              file_name: file.name,
              artist_id: artist.artist_id,
            });

            resolve(true);
          } catch (error) {
            reject(error);
          }
        });
      };

      toast.promise(promise, {
        pending: "Enviando imagem",
        success: "Imagem enviada com sucesso!",
        error: "Houve um erro ao enviar a imagem.",
      });
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={`bg-white/40 text-white font-bold flex gap-1 items-center justify-center py-2 md:py-3 pl-2 md:pl-3 pr-5 md:pr-7 rounded-lg`}
        >
          <PencilSimple
            size={20}
            weight="fill"
            className="min-w-[20px] min-h-[20px]"
          />
          Editar Banner
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-black border border-slate-900 rounded-lg flex flex-col w-[350px] text-white z-[51] gap-2 p-3 items-start">
          <p>Enviar nova imagem para banner</p>
          <label
            htmlFor="uploadFile1"
            className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer font-[sans-serif]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 mr-2 fill-white inline"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload
            <input
              type="file"
              id="uploadFile1"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>

          {file && (
            <p className="text-white max-w-[300px] whitespace-nowrap truncate">
              {file.name}
            </p>
          )}

          <button
            onClick={handleUploadUserImage}
            className="py-1 px-3 rounded-md bg-blue-600 hover:bg-blue-600/70 transition-colors duration-300 text-white"
          >
            Salvar
          </button>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
