import { ProfileHero } from "@/app/components/profile/hero";
import { FavoriteArtists } from "@/app/components/profile/favorite-artists";
import { RecentlyBought } from "@/app/components/profile/recently-bought";

export default function Profile() {
  return (
    <main className="min-h-screen bg-black">
      <ProfileHero />
      <FavoriteArtists />
      <RecentlyBought />
    </main>
  );
}
