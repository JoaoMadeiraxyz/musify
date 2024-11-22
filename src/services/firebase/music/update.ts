import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

const FB_MUSICS_COLLECTION = "musics";

type updateMusicProps = {
  music_id: string;
  music_name: string;
  artist_id: string;
  album_id?: string;
  genre: string;
  price: number;
  status: "launched" | "archived" | "programmed";
};

export async function updateMusicDocument({
  music_id,
  music_name,
  artist_id,
  album_id,
  genre,
  price,
  status,
}: updateMusicProps) {
  try {
    const musicDocumentRef = doc(db, FB_MUSICS_COLLECTION, music_id);

    const musicData = {
      music_name,
      artist_id,
      album_id,
      genre,
      price,
      status,
    };

    await updateDoc(musicDocumentRef, musicData);
  } catch (error) {
    console.error(error);
    throw new Error(
      "An error occurred while trying to update a music document"
    );
  }
}

type archiveMusicProps = {
  music_id: string;
};

export async function archiveMusic({ music_id }: archiveMusicProps) {
  try {
    const musicDocumentRef = doc(db, FB_MUSICS_COLLECTION, music_id);

    await updateDoc(musicDocumentRef, {
      status: "archived",
    });
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while trying to archive a music");
  }
}
