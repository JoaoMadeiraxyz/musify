import { db } from "../config";
import { collection, addDoc } from "firebase/firestore";
import { uploadImage } from "@/services/storage/upload-file";

const FB_MUSICS_COLLECTION = "musics";

type createMusicProps = {
  music_name: string;
  artist_id: string;
  album_id?: string;
  genre: string;
  price: number;
  status: "launched" | "archived" | "programmed";
  image: File;
};

export async function createMusicDocument({
  music_name,
  artist_id,
  album_id,
  genre,
  price,
  status,
  image,
}: createMusicProps) {
  try {
    const musicsDocumentsCollection = collection(db, FB_MUSICS_COLLECTION);

    const music_image = await uploadImage({
      file: image,
      file_name: image.name,
      folder: "musics",
      owner_id: artist_id,
    });

    const newMusicData = {
      music_name,
      artist_id,
      album_id,
      genre,
      price,
      status,
      music_image,
    };

    await addDoc(musicsDocumentsCollection, newMusicData);
  } catch (error) {
    console.error(error);
    throw new Error(
      "An error occurred while trying to create a music document"
    );
  }
}
