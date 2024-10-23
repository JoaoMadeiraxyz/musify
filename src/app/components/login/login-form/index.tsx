"use client";

import { Dispatch, SetStateAction } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

import { FieldErrorMessage } from "../../field-error-message";

import { loginUser } from "@/services/firebase/auth";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Certifique-se de inserir o seu email!",
    })
    .min(4, {
      message: "Insira um e-mail válido!",
    }),
  password: z
    .string({
      required_error: "Certifique-se de inserir a sua senha!",
    })
    .min(8, {
      message: "A senha deve ter ao menos 8 caracteres!",
    }),
});

type LoginFormProps = {
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
};

export function LoginForm({ setIsRegistering }: LoginFormProps) {
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: FieldValues) {
    try {
      await loginUser({ email: data.email, password: data.password }).then(
        () => {
          toast.success("Login realizado com sucesso!", {
            position: "bottom-right",
            pauseOnHover: false,
            theme: "dark",
            draggable: true,
            className: "select-none",
            draggablePercent: 40,
          });
          router.push("/catalog");
        }
      );
    } catch {
      toast.error("Houve um erro ao realizar o login", {
        position: "bottom-right",
        pauseOnHover: false,
        theme: "dark",
        draggable: true,
        className: "select-none",
        draggablePercent: 40,
      });
    }
  }

  return (
    <div className="md:w-1/2 w-full h-full flex flex-col justify-center items-center px-8 gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-4xl text-center">Fazer login</h1>
        <p className="text-center">
          Insira suas credenciais para realizar login
        </p>
      </div>
      
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-5 w-full max-w-[400px]"
      >
        <fieldset className="flex flex-col gap-2">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
          />

          {errors?.email && (
            <FieldErrorMessage message={errors.email.message} />
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <input
            {...register("password")}
            type="password"
            placeholder="Senha"
            className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
          />

          {errors?.password && (
            <FieldErrorMessage message={errors.password.message} />
          )}
        </fieldset>

        <button
          type="submit"
          className="text-black py-2 px-4 bg-white rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300"
        >
          Logar
        </button>

        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => setIsRegistering(true)}
            className="text-white underline hover:text-slate-300 transition-colors duration-300 w-fit"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
