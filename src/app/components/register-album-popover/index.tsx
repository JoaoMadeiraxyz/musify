"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import * as Popover from "@radix-ui/react-popover";

import { FieldErrorMessage } from "@/app/components/field-error-message";

import { Artist } from "@/app/types/artist";

import { createAlbum } from "@/services/firebase/album/create";

import { PlusCircle } from "@phosphor-icons/react";

interface RegisterAlbumPopoverProps {
  artist: Artist | null;
}

const registerAlbumValidationSchema = z.object({
  title: z
    .string({
      required_error: "Certifique-se de incluir o nome do álbum!",
    })
    .min(2, {
      message: "Certifique-se de incluir o nome do álbum!",
    }),
});

export function RegisterAlbumPopover({ artist }: RegisterAlbumPopoverProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerAlbumValidationSchema),
    defaultValues: {
      title: "",
    },
  });

  async function handleCreateAlbum(data: FieldValues) {
    if (!artist) return;

    const promise = () => {
      return new Promise(async (resolve, reject) => {
        try {
          await createAlbum({
            album_name: data.title,
            artist_id: artist.artist_id,
          });

          reset();
          setOpen(false);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      });
    };

    toast.promise(promise, {
      pending: "Cadastrando o álbum...",
      success: "Álbum cadastrado com sucesso!",
      error: "Houve um erro ao cadastrar o álbum.",
    });
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="min-w-[40px] bg-white min-h-full rounded-md p-1 flex items-center justify-center"
        >
          <PlusCircle size={24} className="text-black" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="bg-black border border-slate-900 rounded-lg flex flex-col w-[350px] text-white z-[51] gap-2 p-3 items-start">
          <p>Cadastrar um novo álbum</p>
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              handleSubmit(handleCreateAlbum)(e);
            }}
            className="flex flex-col gap-2"
          >
            <fieldset className="flex flex-col gap-2">
              <input
                {...register("title")}
                type="text"
                placeholder="Nome do álbum"
                className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
              />

              {errors?.title && (
                <FieldErrorMessage message={errors.title.message} />
              )}
            </fieldset>

            <button
              type="submit"
              className="w-full bg-white hover:bg-white/80 transition-colors duration-300 text-black font-bold flex items-center justify-center py-2 rounded-md"
            >
              Confirmar
            </button>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
