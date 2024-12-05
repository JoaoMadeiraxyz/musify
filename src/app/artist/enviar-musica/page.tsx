"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

import { FieldErrorMessage } from "@/app/components/field-error-message";

import { createMusicDocument } from "@/services/firebase/music/create";
import { useAuth } from "@/app/hooks/use-auth";
import { getUserData } from "@/services/firebase/user/get-user-data";
import { getArtistData } from "@/services/firebase/artist/get-artist-data";

import { User } from "@/app/types/user";
import { Artist } from "@/app/types/artist";

import backgroundTexture from "../../../../public/images/texture/bg-texture.png";

const uploadMusicValidationSchema = z.object({
  title: z
    .string({
      required_error: "Certifique-se de inserir o título da música.",
    })
    .min(2, {
      message: "Certifique-se de inserir o título da música.",
    }),
  album: z.string().optional(),
  price: z.string({
    required_error: "Certifique-se de inserir o preço da música.",
  }),
  genre: z
    .string({
      required_error: "Certifique-se de inserir o gênero da música.",
    })
    .min(3, {
      message: "Certifique-se de inserir o gênero da música.",
    }),
  launch_option: z
    .string({
      required_error: "Certifique-se de selecionar um modelo de lançamento.",
    })
    .min(3, {
      message: "Certifique-se de selecionar um modelo de lançamento.",
    }),
});

export default function EnviarMusica() {
  const { currentUser } = useAuth();

  const [file, setFile] = useState<File | null>(null);

  const [userData, setUserData] = useState<User | null>(null);
  const [artistData, setArtistData] = useState<Artist | null>(null);

  async function handleGetUserData() {
    const result = await getUserData(currentUser?.uid);
    setUserData(result);
  }

  async function handleGetArtistData() {
    const result = await getArtistData({ artist_id: userData?.artist_id! });
    setArtistData(result);
  }

  useEffect(() => {
    if (currentUser) {
      handleGetUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (userData?.artist_id) {
      handleGetArtistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(uploadMusicValidationSchema),
    defaultValues: {
      title: "",
      album: "",
      genre: "",
      launch_option: "launched",
      price: "0",
    },
  });

  async function handleUploadMusic(data: FieldValues) {
    if (!artistData) return;

    if (!file) {
      toast.warning("Certifique-se de inserir uma imagem para a música");
    }

    const promise = () => {
      return new Promise(async (resolve, reject) => {
        try {
          await createMusicDocument({
            artist_id: artistData.artist_id!,
            genre: data.genre,
            music_name: data.title,
            price: Number(data.price),
            status: data.launch_option,
            image: file!,
            album_id: data.album,
          });

          reset();
          setFile(null);
          resolve(true);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    };

    toast.promise(promise, {
      pending: "Cadastrando a música...",
      success: "Música cadastrada com sucesso!",
      error: "Houve um erro ao cadastrar a música.",
    });
  }

  return (
    <section className="w-full flex flex-col relative px-8 md:px-36 py-28 min-h-screen bg-black">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40 select-none"
        alt=""
        quality={100}
      />
      <div className="flex flex-col items-center justify-center gap-14 z-10">
        <div className="w-full items-start max-w-[800px] flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Cadastrar Música</h1>
          <p>Insira os dados e imagem da música para cadastrá-la</p>
        </div>
        <div className="max-w-[800px] w-full flex flex-col gap-10">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Clique para enviar</span> a
                  imagem da música
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG ou JPG
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </label>
          </div>

          {file && <p>{file.name}</p>}

          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleSubmit(handleUploadMusic)}
          >
            <fieldset className="flex flex-col gap-2">
              <input
                {...register("title")}
                type="text"
                placeholder="Nome da música"
                className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
              />

              {errors?.title && (
                <FieldErrorMessage message={errors.title.message} />
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <select
                className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
                defaultValue=""
                {...register("genre")}
              >
                <option className="bg-black" value="">
                  Gênero da música
                </option>
                <option className="bg-black" value="indie">
                  Indie
                </option>
                <option className="bg-black" value="professional">
                  Profissional
                </option>
                <option className="bg-black" value="studio">
                  Estúdio
                </option>
              </select>

              {errors?.genre && (
                <FieldErrorMessage message={errors.genre.message} />
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <input
                {...register("price")}
                type="number"
                placeholder="Preço da música"
                className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
              />

              {errors?.price && (
                <FieldErrorMessage message={errors.price.message} />
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <select
                className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
                defaultValue="launched"
                {...register("launch_option")}
              >
                <option className="bg-black" value="launched">
                  Lançar Música
                </option>
                <option className="bg-black" value="programmed">
                  Agendar Música
                </option>
              </select>

              {errors?.launch_option && (
                <FieldErrorMessage message={errors.launch_option.message} />
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2">
              <select
                className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
                defaultValue=""
              >
                <option className="bg-black" value="" disabled>
                  Álbum
                </option>
              </select>

              {errors?.album && (
                <FieldErrorMessage message={errors.album.message} />
              )}
            </fieldset>

            <button
              type="submit"
              className="w-full bg-white hover:bg-white/80 transition-colors duration-300 text-black font-bold flex items-center justify-center py-2 rounded-md"
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
