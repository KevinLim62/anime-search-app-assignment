export async function fetchAnimeDetailData(id: string | undefined) {
  try {
    const animeRequest = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    const animeResult = await animeRequest.json();

    if (animeResult.error) {
      return {
        error: animeResult.error,
      };
    }

    if (animeResult.message) {
      return {
        error: animeResult.message,
      };
    }

    // Simulate 1s delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return animeResult;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
