import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css";

function MoviesCardList({ moviesArray, saveMovies, savedMoviesToggle }) {
  return (
    <section className="movies-list">
      <div className="movies-list__items">
        {moviesArray.map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            saveMovies={saveMovies}
            savedMoviesToggle={savedMoviesToggle}
          />
        ))}
      </div>
      <button className="movies-list__button" type="button" id="more">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
