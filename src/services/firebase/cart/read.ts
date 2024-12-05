import { db } from "../config";
import { collection, getDocs, query, where } from "firebase/firestore";
const CART_COLLECTION = "cart";

import { CartItem } from "@/app/types/cart-item";

export async function getCartItems(user_id: string) {
  try {
    const cartCollectionRef = collection(db, CART_COLLECTION);
    const q = query(cartCollectionRef, where("user_id", "==", user_id));
    const querySnapshot = await getDocs(q);

    const cartItems: CartItem[] = querySnapshot.docs.map((doc) => ({
      cart_item_doc_id: doc.id,
      artist_id: doc.data()?.artist_id,
      item_id: doc.data()?.item_id,
      name: doc.data()?.name,
      price: doc.data()?.price,
      type: doc.data()?.type,
      user_id: doc.data()?.user_id,
    }));

    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("Failed to fetch cart items.");
  }
}
