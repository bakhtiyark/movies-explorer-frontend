import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { useLocation } from "react-router-dom";

function MoviesCard(movie) {
  const { pathname } = useLocation();

  const currentUser = useContext(CurrentUserContext);
  /*

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.movie.owner === currentUser._id;


  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const movieLikeButtonClassName = `movie-card__like-button ${
    isLiked ? "movie-card__like-button_active" : ""
  }`;
*/

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const movieDeleteButtonClassName = `movie-card__delete-button ${
    pathname === "/saved-movies"
      ? "movie-card__delete-button_visible"
      : "movie-card__delete-button_hidden"
  }`;

  return (
    <article className="movie-card">
      <a className="movie-card__link" href={movie.trailerLink}>
        <img alt="Кадр из трейлера" src={movie.image} />
      </a>
      <div className="movie-card__info">
        <h2 className="movie-card__title">{movie.nameRU}</h2>
        <p className="movie-card__duration">{movie.duration}</p>
      </div>
    </article>
  );
}
export default MoviesCard;
