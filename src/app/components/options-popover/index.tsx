"use client";

import { useState } from "react";
import Link from "next/link";

import clsx from "clsx";

import * as Popover from "@radix-ui/react-popover";

import { logoutUser } from "@/services/firebase/auth";

import { useAuth } from "@/app/hooks/use-auth";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { CaretUp } from "@phosphor-icons/react/dist/ssr";

interface OptionsPopoverProps {
  pathname: string;
}

export function OptionsPopover({ pathname }: OptionsPopoverProps) {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="flex gap-1 items-center justify-center">
          <div className="w-10 h-10 bg-slate-400 rounded-lg"></div>
          {open ? (
            <CaretUp size={14} className="text-white" weight="fill" />
          ) : (
            <CaretDown size={14} className="text-white" weight="fill" />
          )}
        </button>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        className="flex flex-col gap-2 bg-slate-900 border rounded-lg border-slate-800 px-3 py-5 w-[150px]"
      >
        <Link
          className={clsx(
            "w-full transition-colors duration-300 hover:text-slate-400 p-1",
            {
              "font-bold": pathname === "/profile",
            }
          )}
          href={`/profile`}
        >
          Perfil
        </Link>
        <Link
          className={clsx(
            "transition-colors duration-300 hover:text-slate-400 p-1",
            {
              "font-bold": pathname === "/bag",
            }
          )}
          href={"/bag"}
        >
          Meu Carrinho
        </Link>
        <button
          className="w-full text-red-500 text-start hover:text-red-500/60 transition-colors duration-300 p-1"
          onClick={logoutUser}
        >
          Sair
        </button>
      </Popover.Content>
    </Popover.Root>
  );
}
