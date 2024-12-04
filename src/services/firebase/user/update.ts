import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

const FB_USER_COLLECTION = "users";

type updateUserProps = {
  user_id: string;
  email?: string;
  username?: string;
  type?: "artist" | "user";
  image_url?: string;
};

export async function updateUserDocument({
  user_id,
  email,
  image_url,
  type,
  username,
}: updateUserProps) {
  try {
    const userDocumentRef = doc(db, FB_USER_COLLECTION, user_id);

    const updatedUserData = {
      email,
      image_url,
      type,
      username,
    };

    await updateDoc(userDocumentRef, updatedUserData);
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao atualizar o documento do usuário");
  }
}
