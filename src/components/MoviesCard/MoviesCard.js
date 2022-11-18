import { useContext } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js"

function MoviesCard(props) {
    const currentUser = useContext(CurrentUserContext)

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.movie.owner === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const movieDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(i => i === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const movieLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    //Обработчик клика
    function handlemoviesCardClick() {
        return props.onmoviesCardClick(props.movie)
    }

    //Обработчик удаления
    function handleDelete() {
        return props.onmoviesCardDelete(props.movie)
    }
    //Обработчик лайков
    function handleLike() {
        return props.onmoviesCardLike(props.movie)
    }

    return (
        <article className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={handlemoviesCardClick} />
            <div className="element__movie">
                <h2 className="element__title">{props.name}</h2>
                <div className="like-compartment">
                    <button className={movieLikeButtonClassName} onClick={handleLike} id="like-button" type="button"></button>
                    <p className="element__like-counter">{props.likes.length}</p>
                </div>

            </div>
            <button className={movieDeleteButtonClassName} onClick={handleDelete} type="button"></button>
        </article>

    )
}
export default MoviesCard;