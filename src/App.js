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
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieId, setMovieId] = useState(null);

  function handleOpenMovieDetail(id) {
    setMovieId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovieDetail(id) {
    setMovieId("");
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`
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
          console.log(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
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
              onCloseMovieDetail={handleCloseMovieDetail}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
