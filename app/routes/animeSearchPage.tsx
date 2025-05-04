import type { Route } from "./+types/animeSearchPage";
import {
  Await,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router";
import AnimeSearchBar from "~/components/animeSearch";
import type { Anime } from "~/lib/types/anime.type";
import Pagination from "~/components/pagination";
import React from "react";
import ListingSkeleton from "~/components/skeleton/listingSkeleton";
import AnimeCard from "~/components/animeCard";
import { fetchAnimeData } from "~/actions/animeData";
import ErrorLoader from "~/components/layout/errorLoader";

export async function loader({ request }: Route.LoaderArgs) {
  const { searchParams } = new URL(request.url);
  const animeDataPromise = fetchAnimeData(
    searchParams.get("limit") ?? "10",
    searchParams.get("page") ?? "1",
    searchParams.get("search") ?? ""
  );

  return {
    animeData: animeDataPromise,
  };
}

export default function AnimeSearchPage() {
  const navigation = useNavigation();
  const { animeData } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  // This ensures we show the loading state during page navigation
  const isNavigating = navigation.state === "loading";
  const currentPage = searchParams.get("page") || "1";

  // Key prop helps React recognize when to re-trigger Suspense
  const suspenseKey = `anime-data-${currentPage}`;

  return (
    <main className="container mx-auto py-6 px-4">
      <div className="mb-8 relative">
        <AnimeSearchBar placeholder="Search anime..." />
      </div>
      <React.Suspense key={suspenseKey} fallback={<ListingSkeleton />}>
        {isNavigating ? (
          <ListingSkeleton />
        ) : (
          <Await
            resolve={animeData}
            children={(resolvedLoaderData) => {
              if (resolvedLoaderData?.error) {
                return <ErrorLoader data={resolvedLoaderData} />;
              }

              if (resolvedLoaderData?.data?.length === 0) {
                return (
                  <ErrorLoader
                    data={{
                      error: "No results found",
                    }}
                    resetEnable={false}
                  />
                );
              }

              return (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    {resolvedLoaderData.data.map((anime: Anime) => (
                      <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                  </div>
                  <Pagination data={resolvedLoaderData.pagination} />
                </>
              );
            }}
          />
        )}
      </React.Suspense>
    </main>
  );
}
