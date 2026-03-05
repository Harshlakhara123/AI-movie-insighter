import axios from "axios";

const OMDB_API_KEY = process.env.OMDB_API_KEY;

export async function fetchMovieByIMDBId(imdbId) {
  if (!imdbId) throw new Error("IMDb ID is required");

  // Format valid? Should start with tt followed by numbers
  // Example valid: tt0133093
  const imdbRegex = /^tt\d{7,8}$/;
  if (!imdbRegex.test(imdbId)) {
    throw new Error("Invalid IMDb ID format. Example: tt0133093");
  }

  if (!OMDB_API_KEY) {
      console.warn("OMDB_API_KEY is not configured.");
  }

  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      i: imdbId,
      apikey: OMDB_API_KEY,
    },
  });

  const data = response.data;

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found on OMDB");
  }

  return {
    title: data.Title,
    poster: data.Poster,
    year: data.Year,
    rating: data.imdbRating,
    cast: data.Actors,
    plot: data.Plot,
    imdbId: imdbId
  };
}
