"use client";

import { useState } from "react";

import Image from "next/image";

import backgroundTexture from "../../../../public/images/texture/bg-texture.png";

export default function EnviarMusica() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <section className="w-full flex flex-col relative px-8 md:px-36 py-28 min-h-screen bg-black">
      <Image
        src={backgroundTexture}
        className="absolute w-full h-full left-0 top-0 z-0 object-cover opacity-40 select-none"
        alt=""
        quality={100}
      />
      <div className="flex flex-col items-center justify-center gap-10 z-10">
        <div className="w-full items-start max-w-[800px] flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Cadastrar Música</h1>
          <p>Insira os dados e imagem da música para cadastrá-la</p>
        </div>
        <div className="max-w-[800px] w-full">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
