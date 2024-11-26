import { db } from "./config";
import { doc, updateDoc } from "firebase/firestore";
const CART_COLLECTION = "cart";

type UpdateItemProps = {
  item_id: string;
  data: Partial<{
    name: string;
    price: number;
  }>;
};

export async function updateCartItem({ item_id, data }: UpdateItemProps) {
  try {
    const itemRef = doc(db, CART_COLLECTION, item_id);
    await updateDoc(itemRef, data);
    console.log("Cart item updated:", item_id);
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw new Error("Failed to update cart item.");
  }
}
