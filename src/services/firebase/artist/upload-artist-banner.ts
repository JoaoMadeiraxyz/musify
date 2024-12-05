import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";
import { uploadImage } from "@/services/storage/upload-file";

const FB_ARTITS_COLLECTION = "artists";

type uploadArtistBannerProps = {
  artist_id: string;
  file: File;
  file_name: string;
};

export async function uploadArtistBanner({
  artist_id,
  file,
  file_name,
}: uploadArtistBannerProps) {
  try {
    const artistDocumentRef = doc(db, FB_ARTITS_COLLECTION, artist_id);

    const image = await uploadImage({
      file,
      file_name,
      folder: "profile",
      owner_id: artist_id,
    });

    await updateDoc(artistDocumentRef, {
      profile_banner: image,
    });
  } catch (error) {
    console.error(error);
  }
}
