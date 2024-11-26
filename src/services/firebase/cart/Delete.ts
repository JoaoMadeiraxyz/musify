import { db } from "./config";
import { doc, deleteDoc } from "firebase/firestore";
const CART_COLLECTION = "cart";

export async function removeCartItem(item_id: string) {
  try {
    const itemRef = doc(db, CART_COLLECTION, item_id);
    await deleteDoc(itemRef);
    console.log("Cart item removed:", item_id);
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw new Error("Failed to remove cart item.");
  }
}
