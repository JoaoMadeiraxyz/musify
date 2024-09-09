import { HeroSection } from "../components/home/hero-section";
import { BestMusicsSection } from "../components/home/best-musics-section";
import { BuyFromTheBest } from "../components/home/buy-from-the-best";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <HeroSection />
      <BestMusicsSection />
      <BuyFromTheBest />
    </main>
  );
}
