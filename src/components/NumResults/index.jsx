import React from "react";

export default function NumResults({movies}) {
  const numMovies = movies.length;

  return (
    <p className="num-results">
      Found <strong>{numMovies}</strong> results
    </p>
  );
}
