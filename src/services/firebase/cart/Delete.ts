import { db } from "../config";
import {
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
const FB_CART_COLLECTION = "cart";

type RemoveCartItemProps = {
  item_id: string;
};

export async function removeCartItem({ item_id }: RemoveCartItemProps) {
  try {
    const itemRef = doc(db, FB_CART_COLLECTION, item_id);
    await deleteDoc(itemRef);
    console.log("Cart item removed:", item_id);
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw new Error("Failed to remove cart item.");
  }
}

type EmptyCartProps = {
  user_id: string;
};

export async function emptyCart({ user_id }: EmptyCartProps) {
  try {
    const cartCollection = collection(db, FB_CART_COLLECTION);
    const q = query(cartCollection, where("user_id", "==", user_id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return;

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao esvaziar o carrinho.");
  }
}
