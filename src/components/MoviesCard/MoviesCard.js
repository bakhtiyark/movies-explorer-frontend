import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const [saved, setSaved] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  function getMovieDuration(num) {
    return `${Math.floor(num / 60)}ч ${num % 60}м`;
  }
  // temp
  function toggleClass() {
    !saved ? setSaved(true) : setSaved(false);
  }

  const movieSavedClassName = `movie-card__save-button ${
    saved ? "movie-card__save-button-active" : ""
  }`;

  return (
    <article className="movie-card">
      {pathname === "/saved-movies" ? (
        <button
          className="movie-card__button movie-card__button_delete"
          onClick={null}
        />
      ) : (
        <button className={movieSavedClassName} onClick={toggleClass}>
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
          src={movie.image}
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
