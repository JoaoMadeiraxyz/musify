import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./config";
import { doc, setDoc } from "firebase/firestore";

type RegisterValues = {
  email: string;
  password: string;
  username: string;
};

const FB_USERS_COLLECTION = "users";

export async function registerNewUser({
  email,
  password,
  username,
}: RegisterValues) {
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

type LoginValues = {
  email: string;
  password: string;
};

export async function loginUser({ email, password }: LoginValues) {
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
