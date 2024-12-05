import { db } from "../config";
import { collection, query, where, getDocs } from "firebase/firestore";

const FB_SALES_COLLECTION = "sales";

import { SaleItem } from "@/app/types/sale-item";

type getUserSalesProps = {
  user_id: string;
};

export async function getUserSales({ user_id }: getUserSalesProps) {
  try {
    const saleCollectionRef = collection(db, FB_SALES_COLLECTION);
    const q = query(saleCollectionRef, where("user_id", "==", user_id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const sales: SaleItem[] = [];

    querySnapshot.forEach((doc) => {
      sales.push({
        sale_id: doc.id,
        artist_id: doc.data()?.artist_id,
        item_id: doc.data()?.item_id,
        price: doc.data()?.price,
        status: doc.data()?.status,
        user_id: doc.data()?.user_id,
      });
    });

    return sales;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Houve um erro ao obter os documentos de venda associados ao usuário"
    );
  }
}
