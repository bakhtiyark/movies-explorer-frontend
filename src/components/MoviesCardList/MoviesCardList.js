import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({
  moviesArray,
  savedMovies,
  onSaveMovies,
  onDeleteMovies,
  showMore,
  moreMoviesButton
}) {
  const { pathname } = useLocation();
  return (
    <section className="movies-list">
      <div className="movies-list__items">
        {moviesArray.map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            savedMovies={savedMovies}
            onSaveMovies={onSaveMovies}
            onDeleteMovies={onDeleteMovies}
          />
        ))}
      </div>
      {moviesArray.length > 0 && pathname !== "/saved-movies" && moreMoviesButton ? (
        <button
          className="movies-list__button"
          type="button"
          id="more"
          onClick={showMore}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default MoviesCardList;
