"use client";

import { useState, useEffect } from "react";

import { ProfileHero } from "@/app/components/profile/hero";
import { FavoriteArtists } from "@/app/components/profile/favorite-artists";
import { RecentlyBought } from "@/app/components/profile/recently-bought";

import { useAuth } from "@/app/hooks/use-auth";
import { getUserData } from "@/services/firebase/user/get-user-data";
import { getUserSales } from "@/services/firebase/sale/get-sales";
import { User } from "@/app/types/user";
import { SaleItem } from "../types/sale-item";

export default function Profile() {
  const { currentUser } = useAuth();

  const [userData, setUserData] = useState<User | null>(null);
  const [userSales, setUserSales] = useState<SaleItem[] | null>(null);

  async function handleGetUserData() {
    const result = await getUserData(currentUser?.uid);
    setUserData(result);
  }

  async function handleGetUserSales() {
    const result = await getUserSales({ user_id: currentUser?.uid! });
    setUserSales(result);
  }

  useEffect(() => {
    if (currentUser?.uid) {
      handleGetUserData();
      handleGetUserSales();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <main className="min-h-screen bg-black">
      <ProfileHero user={userData} />
      <RecentlyBought sales={userSales} />
    </main>
  );
}
