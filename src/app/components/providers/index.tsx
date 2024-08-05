"use client";

import React from "react";

import { ReactLenis, useLenis } from "lenis/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  return (
    <ReactLenis root options={{ duration: 1.8 }}>
      {children}
    </ReactLenis>
  );
}
