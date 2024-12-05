export type Music = {
  music_id: string;
  album_id: string;
  genre: string;
  music_image: string;
  music_name: string;
  price: number;
  created_at: string;
  status: "launched" | "archived" | "programmed";
};
