import { db } from "../config";
import { doc, updateDoc } from "firebase/firestore";

const FB_USER_COLLECTION = "users";

type userProps = {
  email?: string;
  username?: string;
  type?: "artist" | "user";
  image_url?: string;
};

type updateUserProps = {
  user_id: string;
  updated_data: userProps;
};

export async function updateUserDocument({
  user_id,
  updated_data,
}: updateUserProps) {
  try {
    const userDocumentRef = doc(db, FB_USER_COLLECTION, user_id);

    if (updated_data) {
      await updateDoc(userDocumentRef, updated_data);
    }
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao atualizar o documento do usuário");
  }
}
