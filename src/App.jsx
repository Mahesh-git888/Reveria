import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { updateSearchCount, testAppwrite, getTrendingMovies } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Debounce search term to reduce API calls
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // Fetch movies from TMDB
  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setErrorMessage("No movies found.");
        setMovieList([]);
        return;
      }

      setMovieList(data.results);

      // Update search term count in Appwrite
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load trending movies from Appwrite
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies || []);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  // Fetch movies whenever the debounced search term changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  // Load trending movies on initial render
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  // Optional: test Appwrite on app start
  useEffect(() => {
    testAppwrite();
  }, []);

  return (
    <main className="min-h-screen">
      <div className="wrapper relative z-10 p-4">
        <header className="mb-8 text-center">
          <img src="./hero.png" alt="Hero Banner" className="mx-auto mb-4" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>

          <div className="mt-6">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </header>

        {/* Trending Movies */}
        {trendingMovies.length > 0 && (
          <section className="trending mt-[40px]">
            <h2 className="mb-4">Trending Movies</h2>
            <ul className="grid grid-cols-5 gap-4">
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id} className="text-center">
                  <p className="font-bold mb-2">{index + 1}</p>
                  <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="rounded shadow-md mx-auto"
                  />
                  <p className="mt-2">{movie.title}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* All Movies */}
        <section className="all-movies mt-[40px]">
          <h2 className="mb-4">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} fallbackPoster="./No-Poster.png" />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
