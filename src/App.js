import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";
import ErrorMessage from "./components/ErrorMessage";

import { tempWatchedData } from "./data";
import { tempMovieData } from "./data";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";

export default function App() {
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const tempQuery = "avenger";

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieId, setMovieId] = useState(null);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    // 如果storedValue为空，也会直接返回空
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  function handleOpenMovieDetail(id) {
    setMovieId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovieDetail(id) {
    setMovieId("");
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(movieId) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbId !== movieId)
    );
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies!");
          }

          const data = await res.json();

          console.log(data);
          if (data.Response === "False") {
            throw new Error("No movies founded!");
          }

          setMovies(data.Search);
        } catch (err) {
          console.error(err.name);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovieDetail();
      fetchMovies();

      // clean-up function
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* Left box to show all movies by search */}
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onOpenMovieDetail={handleOpenMovieDetail}
            />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>

        {/* Right box to show the movie details */}
        <Box>
          {movieId ? (
            <MovieDetails
              movieId={movieId}
              watched={watched}
              onCloseMovieDetail={handleCloseMovieDetail}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
