import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ movie, savedMovies, onSaveMovie, onDeleteMovie }) {
  const { pathname } = useLocation();
  const savedMovie = savedMovies.find((x) => x.movieId === movie.id);
  const currentUser = useContext(CurrentUserContext);
  const isSaved = movie.id ? savedMovie : pathname === "/saved-movies";

  function getMovieDuration(num) {
    return `${Math.floor(num / 60)}ч ${num % 60}м`;
  }
  // temp
  function handleSaveToggle() {
    if (!savedMovie) {
      onSaveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        thumbnail:`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        trailerLink: movie.trailerLink,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      });
    } else {
      onDeleteMovie(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    }
  }
  // temp
  function handleDelete() {
    onDeleteMovie(movie);
  }
  const movieSavedClassName = `movie-card__save-button ${
    isSaved ? "movie-card__save-button_active" : ""
  }`;

  return (
    <article className="movie-card">
      {pathname === "/saved-movies" ? (
        <button
          className="movie-card__button movie-card__button_delete"
          onClick={handleDelete}
        />
      ) : (
        <button className={movieSavedClassName} onClick={handleSaveToggle}>
          Сохранить
        </button>
      )}
      <a
        className="movie-card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          alt="Кадр из трейлера"
          src={
            pathname === "/saved-movies"
              ? `${movie.image}`
              : `https://api.nomoreparties.co${movie.image.url}`
          }
        />
      </a>
      <div className="movie-card__info">
        <h2 className="movie-card__title">{movie.nameRU}</h2>
        <p className="movie-card__duration">
          {getMovieDuration(movie.duration)}
        </p>
      </div>
    </article>
  );
}
export default MoviesCard;
