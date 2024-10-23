import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config"

type AuthValues = {
  email: string;
  password: string;
};

export async function registerNewUser({ email, password }: AuthValues) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
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