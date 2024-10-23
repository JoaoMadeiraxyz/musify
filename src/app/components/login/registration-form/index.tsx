"use client";

import { Dispatch, SetStateAction } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

import { FieldErrorMessage } from "../../field-error-message";

import { registerNewUser } from "@/services/firebase/auth";

const registrationSchema = z
  .object({
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
    confirmPassword: z
      .string({
        required_error: "Certifique-se de confirmar a sua senha!",
      })
      .min(8, {
        message: "A senha deve ter ao menos 8 caracteres!",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais!",
    path: ["confirmPassword"],
  });

type RegistrationFormProps = {
  setIsRegistering: Dispatch<SetStateAction<boolean>>;
};

export function RegistrationForm({ setIsRegistering }: RegistrationFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleRegister(data: FieldValues) {
    try {
      await registerNewUser({
        email: data.email,
        password: data.password,
      }).then(() => {
        toast.success("Usuário cadastrado com sucesso!", {
          position: "bottom-right",
          pauseOnHover: false,
          theme: "dark",
          draggable: true,
          className: "select-none",
          draggablePercent: 40,
        });
        reset();
        setIsRegistering(false);
      });
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
        <h1 className="font-bold text-4xl text-center">Registrar-se</h1>
        <p className="text-center">
          Insira suas credenciais para se cadastrar no musify
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
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

        <fieldset className="flex flex-col gap-2">
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirme sua senha"
            className="bg-transparent border-2 border-white px-3 py-2 rounded-lg w-full"
          />

          {errors?.confirmPassword && (
            <FieldErrorMessage message={errors.confirmPassword.message} />
          )}
        </fieldset>

        <button
          type="submit"
          className="text-black py-2 px-4 bg-white rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors duration-300"
        >
          Registrar
        </button>

        <div className="w-full flex items-center justify-center">
          <button
            onClick={() => setIsRegistering(false)}
            className="text-white underline hover:text-slate-300 transition-colors duration-300 w-fit"
          >
            Fazer login
          </button>
        </div>
      </form>
    </div>
  );
}
