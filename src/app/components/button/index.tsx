import { ReactNode } from "react";

interface ButtonProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

export default function Button({ icon, text, className }: ButtonProps) {
  return (
    <button
      className={`${className} flex gap-1 items-center justify-center py-3 pl-3 pr-7 rounded-lg`}
    >
      {icon}
      {text}
    </button>
  );
}
