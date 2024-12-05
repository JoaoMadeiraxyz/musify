export type CartItem = {
  cart_item_doc_id: string;
  item_id: string;
  type: "album" | "music" | "artist";
  name: string;
  price: number;
  user_id: string;
  artist_id: string;
};
