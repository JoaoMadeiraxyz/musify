import { db } from "../../../../../config";
import { collection, getDocs, query, where } from "firebase/firestore";
const CART_COLLECTION = "cart";

export async function getCartItems(user_id: string) {
  try {
    const cartCollectionRef = collection(db, CART_COLLECTION);
    const q = query(cartCollectionRef, where("user_id", "==", user_id));
    const querySnapshot = await getDocs(q);

    const cartItems = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items.");
  }
}
