import React from "react";

import type { Metadata } from "next";
import "./globals.css";

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
      <Providers>
        <body className="text-white font-inter">{children}</body>
      </Providers>
    </html>
  );
}
