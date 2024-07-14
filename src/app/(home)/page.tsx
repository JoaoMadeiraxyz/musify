import { Button } from "../components/Button";

import { AirplaneTakeoff } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-5">
      <Button />
      <AirplaneTakeoff size={32} weight="duotone" />
    </main>
  );
}
