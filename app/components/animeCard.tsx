import { Link } from "react-router";
import type { Anime } from "~/lib/types/anime.type";
import { Card, CardContent } from "./ui/card";

const AnimeCard = ({ anime }: { anime: Anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} viewTransition>
      <Card className="overflow-hidden h-full transition-transform hover:scale-105 pt-0">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full">
            <img
              src={anime.images.jpg.large_image_url || "/placeholder.svg"}
              alt={anime.title}
              className="w-full h-full contain-layout"
              loading="lazy"
            />
          </div>
          <div className="p-2 text-justify">
            <h3 className="text-sm font-medium truncate">{anime.title}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default AnimeCard;
