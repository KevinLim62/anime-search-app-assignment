import { Link } from "react-router";
import type { Anime } from "~/lib/types/anime.type";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const AnimeDetail = ({ anime }: { anime: Anime }) => {
  return (
    <>
      <Link to="/" viewTransition>
        <Button
          variant="default"
          className="flex ml-auto my-2 w-full md:w-auto bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
        <div className="w-full max-w-[300px] mx-auto md:mx-0">
          <div className="relative aspect-[3/4] w-full">
            <img
              src={anime.images.jpg.large_image_url || "/placeholder.svg"}
              alt={anime.title}
              className="object-cover rounded-md"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {anime.synopsis ?? "No synopsis available."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {anime.score}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                {anime.score_by} USERS
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {anime.rank}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                RANKED
              </div>
            </div>

            <div className="bg-pink-100 dark:bg-pink-900 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-pink-700 dark:text-pink-300">
                {anime.popularity}
              </div>
              <div className="text-xs text-pink-600 dark:text-pink-400">
                POPULARITY
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {anime.members}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                MEMBERS
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeDetail;
