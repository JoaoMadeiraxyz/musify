import Image from "next/image";

import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export function MusicsList() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row">
        <div className="flex flex-row w-[70%]">
          <div className="flex flex-row gap-2 items-center">
            1
            <Image
              className="w-20 h-20 object-cover object-center"
              src={"https://placehold.co/80x80/png"}
              width={80}
              height={80}
              alt="Artist profile image"
            />
            <div className="flex flex-col">
              <p>Music name</p>
              <p className="text-slate-300">Artist name</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-[20%]">
          <p className="text-slate-300">Album Name</p>
        </div>

        <div className="flex flex-row w-[10%] justify-end">
          <CheckCircle size={34} className="text-blue-600" />
        </div>
      </div>
    </div>
  );
}
