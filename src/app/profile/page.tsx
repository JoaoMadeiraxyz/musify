"use client";

import { useState, useEffect } from "react";

import { ProfileHero } from "@/app/components/profile/hero";
import { FavoriteArtists } from "@/app/components/profile/favorite-artists";
import { RecentlyBought } from "@/app/components/profile/recently-bought";

import { useAuth } from "@/app/hooks/use-auth";
import { getUserData } from "@/services/firebase/user/get-user-data";
import { getUserSales } from "@/services/firebase/sale/get-sales";
import { getArtistSales } from "@/services/firebase/sale/get-sales";
import { getArtistData } from "@/services/firebase/artist/get-artist-data";
import { User } from "@/app/types/user";
import { Artist } from "@/app/types/artist";
import { SaleItem } from "../types/sale-item";

export default function Profile() {
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState<User | null>(null);
  const [userSales, setUserSales] = useState<SaleItem[] | null>(null);
  const [artistData, setArtistData] = useState<Artist | null>(null);

  async function handleGetUserData() {
    const result = await getUserData(currentUser?.uid);
    setUserData(result);
  }

  async function handleGetArtistData() {
    const result = await getArtistData({ artist_id: userData?.artist_id! });
    setArtistData(result);
  }

  async function handleGetUserSales() {
    if (userData?.type === "user") {
      const result = await getUserSales({ user_id: currentUser?.uid! });
      setUserSales(result);
    } else {
      const result = await getArtistSales({
        artist_id: userData?.artist_id!,
      });
      setUserSales(result);
    }
  }

  useEffect(() => {
    if (currentUser?.uid) {
      handleGetUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (userData) {
      handleGetUserSales();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  useEffect(() => {
    if (userData?.artist_id && userData.type === "artist") {
      handleGetArtistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <main className="min-h-screen bg-black">
      <ProfileHero user={userData} />
      <RecentlyBought sales={userSales} type={userData?.type} />
    </main>
  );
}
