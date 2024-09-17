import { ReactNode } from "react";

interface ButtonProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

export function Button({ icon, text, className }: ButtonProps) {
  return (
    <button
      className={`${className} flex gap-1 items-center justify-center py-2 md:py-3 pl-2 md:pl-3 pr-5 md:pr-7 rounded-lg`}
    >
      {icon}
      {text}
    </button>
  );
}
