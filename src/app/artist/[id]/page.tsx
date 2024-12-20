"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { Hero } from "./components/hero";
import { Catalog } from "./components/catalog";

import { useAuth } from "@/app/hooks/use-auth";
import { getUserData } from "@/services/firebase/user/get-user-data";
import { getArtistData } from "@/services/firebase/artist/get-artist-data";
import { listArtistMusics } from "@/services/firebase/music/get-musics";

import { User } from "@/app/types/user";
import { Artist } from "@/app/types/artist";
import { Music } from "@/app/types/music";

export default function ArtistPage() {
  const { currentUser } = useAuth();
  const pathname = usePathname();

  const [userData, setUserData] = useState<User | null>(null);
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [musics, setMusics] = useState<Music[] | null>(null);

  async function handleGetUserData() {
    const result = await getUserData(currentUser?.uid);
    setUserData(result);
  }

  async function handleGetArtistData() {
    const result = await getArtistData({ artist_id: pathname.split("/")[2] });
    setArtistData(result);
  }

  async function handleGetArtistMusics() {
    const result = await listArtistMusics({
      artist_id: artistData?.artist_id!,
    });
    setMusics(result);
  }

  useEffect(() => {
    if (currentUser) {
      handleGetUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (pathname) {
      handleGetArtistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (artistData?.artist_id) {
      handleGetArtistMusics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistData]);

  return (
    <div className="bg-black">
      <Hero user={userData} artist_data={artistData} />
      <Catalog musics={musics} />
    </div>
  );
}
