import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({
  shownArray,
  saveMovies,
  savedMoviesToggle,
  moviesArray,
  showMore,
}) {
  const { pathname } = useLocation();
  return (
    <section className="movies-list">
      <div className="movies-list__items">
        {shownArray.map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            saveMovies={saveMovies}
            savedMoviesToggle={savedMoviesToggle}
          />
        ))}
      </div>
      {moviesArray.length > 0 && pathname !== "/saved-movies" ? (
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
