import { db } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Album } from "@/app/types/album";

const FB_ALBUM_COLLECTION = "album";

type GetArtistAlbumsProps = {
  artist_id: string;
};

export async function getArtistAlbums({ artist_id }: GetArtistAlbumsProps) {
  try {
    const albumsCollectionRef = collection(db, FB_ALBUM_COLLECTION);
    const q = query(albumsCollectionRef, where("artist_id", "==", artist_id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const albums: Album[] = [];
      querySnapshot.docs.forEach((doc) => {
        albums.push({
          album_id: doc.id,
          album_name: doc.data()?.album_name,
          artist_id: doc.data()?.artist_id,
        });
      });

      return albums;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
}

export async function listAlbums() {
  try {
    const albumsCollectionRef = collection(db, FB_ALBUM_COLLECTION);
    const q = query(albumsCollectionRef);
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const albums: Album[] = [];
      querySnapshot.docs.forEach((doc) => {
        albums.push({
          album_id: doc.id,
          album_name: doc.data()?.album_name,
          artist_id: doc.data()?.artist_id,
        });
      });

      return albums;
    }

    return null;
  } catch (error) {
    console.error(error);
  }
}
