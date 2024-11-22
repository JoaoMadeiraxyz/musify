"use client";

import React from "react";

import { ReactLenis, useLenis } from "lenis/react";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "@/app/providers/auth-context";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  return (
    <Theme>
      <AuthProvider>
        <ReactLenis root options={{ duration: 1.8 }}>
          {children}
        </ReactLenis>
      </AuthProvider>
    </Theme>
  );
}
