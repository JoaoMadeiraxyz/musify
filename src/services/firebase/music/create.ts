import { db } from "../config";
import { collection, addDoc } from "firebase/firestore";

const FB_MUSICS_COLLECTION = "musics";

type createMusicProps = {
  music_name: string;
  artist_id: string;
  album_id?: string;
  genre: string;
  price: number;
  status: "launched" | "archived" | "programmed";
};

export async function createMusicDocument({
  music_name,
  artist_id,
  album_id,
  genre,
  price,
  status,
}: createMusicProps) {
  try {
    const musicsDocumentsCollection = collection(db, FB_MUSICS_COLLECTION);

    const newMusicData = {
      music_name,
      artist_id,
      album_id,
      genre,
      price,
      status,
    };

    await addDoc(musicsDocumentsCollection, newMusicData);
  } catch (error) {
    console.error(error);
    throw new Error(
      "An error occurred while trying to create a music document"
    );
  }
}
