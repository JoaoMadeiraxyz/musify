"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { OptionsPopover } from "../options-popover";

import musifyLogo from "../../../../public/logo.svg";

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export function Menu() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center fixed top-0 w-screen px-12 py-6 z-50">
      <div className="flex gap-10 items-center">
        <Link href={"/catalog"}>
          <Image
            src={musifyLogo}
            alt="Logo escrito MUSIFY"
            className="w-[200px]"
          />
        </Link>

        <div className="flex gap-5 items-center">
          <Link
            className={clsx(
              "transition-colors duration-300 hover:text-slate-400",
              {
                "font-bold": pathname === "/catalog",
              }
            )}
            href={"/catalog"}
          >
            Home
          </Link>
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <button className="flex gap-1 items-end text-white transition-colors duration-300 hover:text-slate-400">
          Procurar
          <MagnifyingGlass size={28} />
        </button>

        <OptionsPopover pathname={pathname} />
      </div>
    </nav>
  );
}
