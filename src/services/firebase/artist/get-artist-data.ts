import { db } from "../config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const FB_ARTITS_COLLECTION = "artists";

import { Artist } from "@/app/types/artist";

type getArtistDataProps = {
  artist_id: string;
};

export async function getArtistData({ artist_id }: getArtistDataProps) {
  try {
    const artistDocRef = doc(db, FB_ARTITS_COLLECTION, artist_id);
    const artistDocSnapshot = await getDoc(artistDocRef);

    const data = {
      artist_id: artistDocSnapshot.id,
      artist_name: artistDocSnapshot.data()?.artist_name,
      user_id: artistDocSnapshot.data()?.user_id,
      state: artistDocSnapshot.data()?.state,
      profile_banner: artistDocSnapshot.data()?.profile_banner,
    };

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao obter os dados do artista.");
  }
}

export async function listArtists() {
  try {
    const artistsCollectionRef = collection(db, FB_ARTITS_COLLECTION);
    const q = query(artistsCollectionRef, where("state", "==", "active"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const artists: Artist[] = [];
    querySnapshot.forEach((doc) => {
      artists.push({
        artist_id: doc.id,
        artist_name: doc.data()?.artist_name,
        state: doc.data()?.state,
        user_id: doc.data()?.user_id,
        profile_banner: doc.data()?.profile_banner,
      });
    });

    return artists;
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao listar artistas.");
  }
}
