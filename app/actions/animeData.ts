export async function fetchAnimeData(
  limit: string,
  page: string,
  search: string
) {
  try {
    const animeRequest = await fetch(
      `https://api.jikan.moe/v4/anime?limit=${limit}&page=${page}&q=${search}`
    );
    const animeResult = await animeRequest.json();

    if (animeResult.error) {
      return { error: animeResult.error };
    }

    if (animeResult.message) {
      return { error: animeResult.message };
    }

    // Simulate 1s delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return animeResult;
  } catch (error) {
    return { error: "Failed to fetch data" };
  }
}
