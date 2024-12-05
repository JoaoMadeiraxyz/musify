import { db } from "../config";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const CART_COLLECTION = "cart";

type ItemProps = {
  item_id: string;
  name: string;
  price: number;
  user_id: string;
  artist_id: string;
};

type AddItemProps = {
  item: ItemProps;
};

export async function addItemToCart({ item }: AddItemProps) {
  try {
    const cartCollectionRef = collection(db, CART_COLLECTION);
    const q = query(
      cartCollectionRef,
      where("user_id", "==", item.user_id),
      where("item_id", "==", item.item_id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.error("Este item já está no seu carrinho!");
      return;
    }

    await addDoc(cartCollectionRef, item);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw new Error("Failed to add item to cart.");
  }
}
