export type Artist = {
  artist_id: string;
  artist_name: string;
  user_id: string;
  state: "active" | "inactive";
  profile_banner?: string;
};
