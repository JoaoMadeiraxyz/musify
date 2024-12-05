import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";
import { uploadImage } from "@/services/storage/upload-file";

const FB_USER_COLLECTION = "users";

type uploadUserImageProps = {
  user_id: string;
  file: File;
  file_name: string;
};

export async function uploadUserImage({
  file,
  file_name,
  user_id,
}: uploadUserImageProps) {
  try {
    const userDocumentRef = doc(db, FB_USER_COLLECTION, user_id);

    const image = await uploadImage({
      file,
      file_name,
      folder: "profile",
      owner_id: user_id,
    });

    await updateDoc(userDocumentRef, {
      image_url: image,
    });
  } catch (error) {
    console.error(error);
  }
}
