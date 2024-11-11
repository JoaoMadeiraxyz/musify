import { Hero } from "./components/hero";
import { Catalog } from "./components/catalog";

export default function Artist() {
  return (
    <div className="bg-black">
      <Hero />
      <Catalog />
    </div>
  );
}
