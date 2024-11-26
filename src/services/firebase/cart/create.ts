import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

const CART_COLLECTION = "cart";

type AddItemProps = {
  id: string;
  type: "album" | "music" | "artist";
  name: string;
  price: number;
  user_id: string;
};

export async function addItemToCart(item: AddItemProps) {
  try {
    const cartCollectionRef = collection(db, CART_COLLECTION);
    await addDoc(cartCollectionRef, item);
    console.log("Item added to cart:", item);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw new Error("Failed to add item to cart."); 
  }
}
