import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__card">
          <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар"
            />
            <button
              className="profile__avatar-replace"
              onClick={props.replaceAvatar}
              type="button"
            ></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__button profile__button_edit"
            onClick={props.openProfilePopup}
          ></button>
        </div>

        <button
          type="button"
          className="profile__button profile__button_add"
          onClick={props.addPlace}
        ></button>
      </section>
    </main>
  );
}
