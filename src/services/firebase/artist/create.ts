import { db } from "../config";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const FB_ARTITS_COLLECTION = "artists";
const FB_USER_COLLECTION = "users";

type createArtistProps = {
  user_id: string;
  artist_name?: string;
};

export async function createArtistProfile({
  user_id,
  artist_name,
}: createArtistProps) {
  try {
    const artistsDocumentsCollectionRef = collection(db, FB_ARTITS_COLLECTION);
    const userDocumentRef = doc(db, FB_USER_COLLECTION, user_id);

    const artistData = {
      user_id,
      artist_name,
      state: "active",
    };

    const artist = await addDoc(artistsDocumentsCollectionRef, artistData);

    await updateDoc(userDocumentRef, {
      artist_id: artist.id,
      type: "artist",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao cadastrar o perfil de artista.");
  }
}
