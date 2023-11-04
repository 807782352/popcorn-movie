import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";

import { tempWatchedData } from "./data";
import { tempMovieData } from "./data";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

export default function App() {
  const OMDB_API_KEY = "1d123736";

  const query = "avenger";

  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchMovies() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setIsLoading(false);
      console.log(data.Search);
    }

    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
