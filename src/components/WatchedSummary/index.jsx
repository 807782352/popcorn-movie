import React from "react";

export default function WatchedSummary({ watched }) {
  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  function numRound(num) {
    return Math.round(num * 100) / 100;
  }

  const avgImdbRating = numRound(
    average(watched.map((movie) => movie.imdbRating))
  );
  const avgUserRating = numRound(
    average(watched.map((movie) => movie.userRating))
  );
  const avgRuntime = numRound(average(watched.map((movie) => movie.runtime)));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
