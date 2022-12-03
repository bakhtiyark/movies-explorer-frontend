import { useState, useContext } from "react";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [newName, setNewName] = useState(currentUser.name);
  const [newEmail, setNewEmail] = useState(currentUser.email);

  function handleSubmit(e) {
    e.preventDefault();

    mainApi
      .setUserInfo(newName, newEmail)
      .then(() => {
        setName(newName);
        setEmail(newEmail);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNameChange(e) {
    const name = e.target.value;
    setNewName(name);
  }
  function handleEmailChange(e) {
    const email = e.target.value;
    setNewEmail(email);
  }

  return (
    <section className="profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form__content">
          <h1 className="profile-form__title">{`Привет, ${name}!`}</h1>
          <div className="profile-form__item">
            <p className="profile-form__item-value">Имя</p>
            <input
              className="profile-form__item-value form__input"
              onChange={handleNameChange}
              value={newName}
            />
          </div>
          <div className="profile-form__item">
            <p className="profile-form__item-value">E-mail</p>
            <input
              className="profile-form__item-value form__input"
              onChange={handleEmailChange}
              value={newEmail}
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
