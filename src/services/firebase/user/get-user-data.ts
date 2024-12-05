import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";

const FB_USER_COLLECTION = "users";

export async function getUserData(user_id: string | undefined) {
  try {
    if (user_id) {
      const userDocRef = doc(db, FB_USER_COLLECTION, user_id);
      const userDocSnapshot = await getDoc(userDocRef);

      const userData = {
        user_id: userDocSnapshot.id,
        email: userDocSnapshot.data()?.email,
        username: userDocSnapshot.data()?.username,
        type: userDocSnapshot.data()?.type,
        image_url: userDocSnapshot.data()?.image_url,
        artist_id: userDocSnapshot.data()?.artist_id,
      };

      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao obter os dados do usuário");
  }
}
