import type { Route } from "./+types/animeResultPage";
import AnimeDetail from "~/components/animeDetail";
import React from "react";
import DetailSkeleton from "~/components/skeleton/detailSkeleton";
import { Await, useLoaderData } from "react-router";
import { fetchAnimeDetailData } from "~/actions/animeDetailData";
import ErrorLoader from "~/components/layout/errorLoader";

export async function loader({ params }: Route.LoaderArgs) {
  const animeDataPromise = fetchAnimeDetailData(params.id);

  return {
    animeData: animeDataPromise,
  };
}

export default function AnimeResultPage() {
  const { animeData } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto py-6 px-4 max-w-6xl">
      <React.Suspense fallback={<DetailSkeleton />}>
        <Await
          resolve={animeData}
          children={(resolvedLoaderData) => {
            if (resolvedLoaderData?.error) {
              return <ErrorLoader data={resolvedLoaderData} />;
            }

            return <AnimeDetail anime={resolvedLoaderData.data} />;
          }}
        />
      </React.Suspense>
    </main>
  );
}
