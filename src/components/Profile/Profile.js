import { useState, useContext } from "react";
import api from "../../utils/Api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  return (
    <section className="profile">
      <form className="profile-form" onSubmit={null}>
        <div className="profile-form__content">
          <h1 className="profile-form__title">{`Привет, ${name}!`}</h1>
          <div className="profile-form__item">
            <p className="profile-form__item-value">
              Имя
            </p>
            <input
              className="profile-form__item-value form__input"
              value={name}
            />
          </div>
          <div className="profile-form__item">
            <p className="profile-form__item-value">
              E-mail
            </p>
            <input
              className="profile-form__item-value form__input"
              value={email}
            />
          </div>
        </div>
        <div className="profile-form__links">
          <button
            className="profile-form__link profile-form__link_submit"
            type="submit"
          >
            Редактировать
          </button>
          <button
            className="profile-form__link profile-form__link_logout"
            type="button"
            onClick={onSignOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}
export default Profile;
