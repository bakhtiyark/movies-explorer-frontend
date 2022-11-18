import MoviesCard from "../MoviesCard/MoviesCard";

import "./MoviesCardList.css"

function MoviesCardList(props) {
  return (
    <section className="elements">
      {props.cards.map((card) => {
        return (
          <MoviesCard
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        );
      })}
    </section>
  );
}

export default MoviesCardList;