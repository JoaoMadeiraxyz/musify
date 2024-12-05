import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";

const FB_ARTITS_COLLECTION = "artists";

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
