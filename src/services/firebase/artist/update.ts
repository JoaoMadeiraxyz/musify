import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

const FB_ARTITS_COLLECTION = "artists";
const FB_USER_COLLECTION = "users";

type artistData = {
  user_id?: string;
  profile_banner?: string;
  artist_name?: string;
};

type updateArtistProps = {
  artist_id: string;
  updated_data: artistData;
};

export async function updateArtist({
  artist_id,
  updated_data,
}: updateArtistProps) {
  try {
    const artistDocumentRef = doc(db, FB_ARTITS_COLLECTION, artist_id);

    if (updated_data) {
      await updateDoc(artistDocumentRef, updated_data);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao atualizar o artista.");
  }
}

type artistProfileStateProps = {
  artist_id: string;
  user_id: string;
};

export async function inactivateArtistProfile({
  artist_id,
  user_id,
}: artistProfileStateProps) {
  try {
    const artistDocumentRef = doc(db, FB_ARTITS_COLLECTION, artist_id);
    const userDocumentRef = doc(db, FB_USER_COLLECTION, user_id);

    await updateDoc(artistDocumentRef, {
      state: "inactive",
    });

    await updateDoc(userDocumentRef, {
      type: "user",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao inativar o perfil do artista.");
  }
}

export async function reactivateArtistProfile({
  artist_id,
  user_id,
}: artistProfileStateProps) {
  try {
    const artistDocumentRef = doc(db, FB_ARTITS_COLLECTION, artist_id);
    const userDocumentRef = doc(db, FB_USER_COLLECTION, user_id);

    await updateDoc(artistDocumentRef, {
      state: "active",
    });

    await updateDoc(userDocumentRef, {
      type: "artist",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao inativar o perfil do artista.");
  }
}
