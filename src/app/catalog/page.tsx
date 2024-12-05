"use client";

import { useState, useEffect } from "react";

import { HeroSection } from "../components/catalog/hero-section";
import { CatalogCategories } from "../components/catalog/catalog-categories";

import { listMusics } from "@/services/firebase/music/get-musics";
import { listArtists } from "@/services/firebase/artist/get-artist-data";

import { Music } from "../types/music";
import { Artist } from "../types/artist";

export default function Catalog() {
  const [musics, setMusics] = useState<Music[] | null>(null);
  const [artists, setArtists] = useState<Artist[] | null>(null);

  async function handleGetMusics() {
    const result = await listMusics();
    setMusics(result);
  }

  async function handleGetArtists() {
    const result = await listArtists();
    setArtists(result);
  }

  useEffect(() => {
    handleGetMusics();
    handleGetArtists();
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <HeroSection artist={artists ? artists[0] : null} />
      <CatalogCategories musics={musics} />
    </main>
  );
}
