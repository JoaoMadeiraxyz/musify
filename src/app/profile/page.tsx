"use client";

import { useState, useEffect } from "react";

import { ProfileHero } from "@/app/components/profile/hero";
import { FavoriteArtists } from "@/app/components/profile/favorite-artists";
import { RecentlyBought } from "@/app/components/profile/recently-bought";

import { useAuth } from "@/app/hooks/use-auth";
import { getUserData } from "@/services/firebase/user/get-user-data";
import { User } from "@/app/types/user";

export default function Profile() {
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState<User | null>(null);

  async function handleGetUserData() {
    const result = await getUserData(currentUser?.uid);
    setUserData(result);
  }

  useEffect(() => {
    if (currentUser) {
      handleGetUserData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <main className="min-h-screen bg-black">
      <ProfileHero user={userData} />
      <FavoriteArtists />
      <RecentlyBought />
    </main>
  );
}
