export type SaleItem = {
  item_id: string;
  type: "album" | "music" | "artist";
  name: string;
  price: number;
  user_id: string;
  artist_id: string;
  status: "pending" | "declined" | "finished" | "canceled";
};
