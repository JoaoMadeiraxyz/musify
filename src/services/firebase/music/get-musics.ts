import { db } from "../config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { Music } from "@/app/types/music";

const FB_MUSICS_COLLECTION = "musics";

type ListArtistMusicsProps = {
  artist_id: string;
};

export async function listArtistMusics({ artist_id }: ListArtistMusicsProps) {
  try {
    const musicsCollectionRef = collection(db, FB_MUSICS_COLLECTION);
    const q = query(
      musicsCollectionRef,
      where("artist_id", "==", artist_id),
      where("status", "==", "launched"),
      orderBy("created_at", "desc")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const musics: Music[] = [];
    querySnapshot.forEach((doc) => {
      musics.push({
        music_id: doc.id,
        album_id: doc.data()?.album_id,
        genre: doc.data()?.genre,
        music_image: doc.data()?.music_image,
        music_name: doc.data()?.music_name,
        price: doc.data()?.price,
        status: doc.data()?.status,
        created_at: doc.data()?.created_at,
      });
    });

    return musics;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function listMusics() {
  try {
    const musicsCollectionRef = collection(db, FB_MUSICS_COLLECTION);
    const q = query(musicsCollectionRef, where("status", "==", "launched"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const musics: Music[] = [];
    querySnapshot.forEach((doc) => {
      musics.push({
        music_id: doc.id,
        album_id: doc.data()?.album_id,
        genre: doc.data()?.genre,
        music_image: doc.data()?.music_image,
        music_name: doc.data()?.music_name,
        price: doc.data()?.price,
        status: doc.data()?.status,
        created_at: doc.data()?.created_at,
      });
    });

    return musics;
  } catch (error) {
    console.error(error);
    return null;
  }
}
