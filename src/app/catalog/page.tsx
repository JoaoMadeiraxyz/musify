import { HeroSection } from "../components/catalog/hero-section";
import { CatalogCategories } from "../components/catalog/catalog-categories";

export default function Catalog() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <CatalogCategories />
    </main>
  );
}
