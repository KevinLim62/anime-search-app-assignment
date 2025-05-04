export type Anime = {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  synopsis?: string;
  score: number;
  score_by: number;
  rank: number;
  members: number;
  popularity: number;
};
