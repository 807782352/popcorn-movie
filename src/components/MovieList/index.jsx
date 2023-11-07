import React from "react";
import Movie from "../Movie";

export default function MovieList({ movies, onOpenMovieDetail }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onOpenMovieDetail={onOpenMovieDetail} />
      ))}
    </ul>
  );
}
