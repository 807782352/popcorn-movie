import React, { useState } from "react";
import Box from "../Box";
import MovieList from "../MovieList";
import WatchedSummary from "../WatchedSummary";
import WatchedMovieList from "../WatchedMovieList";
import { tempWatchedData } from "../../data";
import { tempMovieData } from "../../data";

export default function Main() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className="main">
      <Box>
        <MovieList movies={movies}/>
      </Box>
      <Box>
        <WatchedSummary watched={watched} />
        <WatchedMovieList watched={watched} />
      </Box>
    </main>
  );
}
