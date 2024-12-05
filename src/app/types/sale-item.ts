export type SaleItem = {
  sale_id: string;
  item_id: string;
  price: number;
  user_id: string;
  artist_id: string;
  status: "pending" | "declined" | "finished" | "canceled";
};
