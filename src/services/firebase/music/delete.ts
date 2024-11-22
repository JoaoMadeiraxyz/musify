import { db } from "../config";
import { doc, deleteDoc } from "firebase/firestore";

const FB_MUSICS_COLLECTION = "musics";

type deleteMusicProps = {
  music_id: string;
};

export async function deleteMusicDocument({ music_id }: deleteMusicProps) {
  try {
    const musicDocumentRef = doc(db, FB_MUSICS_COLLECTION, music_id);

    await deleteDoc(musicDocumentRef);
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while trying to delete a music");
  }
}
