import React, { useEffect, useState } from "react";
import StarRating from "../StarRating";
import Loader from "../Loader";

export default function MovieDetails({
  movieId,
  onCloseMovieDetail,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const isWatched = watched.map((movie) => movie.imdbId).includes(movieId);

  const watchedUserRating = watched.find(
    (movie) => movieId === movie.imdbId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    // 用Number是为了算时长和分数平均折
    const newWatchedMovie = {
      imdbId: movieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovieDetail();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovieDetail();
          console.log("CLOSING MOVIE DETAILS");
        }
      }

      document.addEventListener("keydown", callback);

      // clean-up function
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovieDetail]
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}`
        );

        const data = await res.json();

        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [movieId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      // clean-up function (closure)
      return function () {
        document.title = "Popcorn Movies";
        console.log(`clean up effect for movie => ${title}`);
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetail}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have rated this moive already! <span>⭐</span>
                  {watchedUserRating}
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring : {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
