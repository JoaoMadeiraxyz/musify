import { db } from "../config";
import { collection, addDoc } from "firebase/firestore";

const FB_ALBUM_COLLECTION = "album";

type CreateAlbumProps = {
  album_name: string;
  artist_id: string;
};

export async function createAlbum({ album_name, artist_id }: CreateAlbumProps) {
  try {
    const albumsColllectionRef = collection(db, FB_ALBUM_COLLECTION);

    await addDoc(albumsColllectionRef, {
      album_name,
      artist_id,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao cadastrar o album.");
  }
}
