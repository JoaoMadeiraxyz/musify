import React from "react";

import { ToastContainer } from "react-toastify";

import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Menu } from "./components/menu";

import { Providers } from "./components/providers";

export const metadata: Metadata = {
  title: "Musify",
  description: "Aplicativo de musicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter text-white">
        <Providers>
          <Menu />
          {children}
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
