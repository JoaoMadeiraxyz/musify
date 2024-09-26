"use client";

import { useState } from "react";

import Image from "next/image";

import { LoginForm } from "../components/login/login-form";
import { RegistrationForm } from "../components/login/registration-form";

import loginScreenImage from "../../../public/images/login/login-screen-image.png";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  return (
    <main className="h-screen bg-black flex items-center px-56 py-20">
      <div className="w-1/2 h-full bg-black">
        <Image
          className="w-full h-full opacity-80"
          width={800}
          height={1000}
          src={loginScreenImage}
          quality={100}
          alt="Imagem com os artistas Joji, Billie Eilish, Post Malone e The Weeknd"
        />
      </div>
      {isRegistering ? (
          <RegistrationForm setIsRegistering={setIsRegistering} />
        ) : (
          <LoginForm setIsRegistering={setIsRegistering} />
        )}
    </main>
  );
}
