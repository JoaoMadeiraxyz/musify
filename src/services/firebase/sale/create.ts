import { db } from "../config";
import { collection, addDoc } from "firebase/firestore";

const FB_SALES_COLLECTION = "sales";

type CreateSaleProps = {
  user_id: string;
  artist_id: string;
  item_id: string;
  price: number;
};

export async function createSale({
  artist_id,
  item_id,
  price,
  user_id,
}: CreateSaleProps) {
  try {
    const saleCollectionRef = collection(db, FB_SALES_COLLECTION);

    await addDoc(saleCollectionRef, {
      artist_id,
      item_id,
      price,
      user_id,
      status: "finished",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao gerar uma venda!");
  }
}
