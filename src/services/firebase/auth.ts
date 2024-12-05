import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc } from "firebase/firestore";

type AuthValues = {
  email: string;
  password: string;
  username: string;
};

const FB_USERS_COLLECTION = "users";

export async function registerNewUser({
  email,
  password,
  username,
}: AuthValues) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, FB_USERS_COLLECTION, user.uid), {
      username,
      email,
      type: "user",
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao registrar o usuário.");
  }
}

export async function loginUser({ email, password }: AuthValues) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao tentar realizar o login.");
  }
}

export async function logoutUser() {
  try {
    signOut(auth);
  } catch (error) {
    throw new Error("Houve um erro ao tentar realizar o logout.");
  }
}
