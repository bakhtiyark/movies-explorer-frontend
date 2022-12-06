import { useState, useContext, useEffect } from "react";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

import ValidateForm from "../../utils/ValidateForm";

function Profile({ onUpdate, onSignOut, profileMessage }) {
  const {
    formValues,
    setFormValues,
    handleChange,
    error,
    setError,
    isValid,
    setIsValid,
    resetForm,
  } = ValidateForm();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setFormValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setFormValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdate({
      name: formValues.name,
      email: formValues.email,
    });
  }
  return (
    <section className="profile">
      <form className="profile-form form" onSubmit={handleSubmit}>
        <div className="profile-form__content">
          <h1 className="profile-form__title">{`Привет, ${currentUser.name}!`}</h1>
          <div className="profile-form__item">
            <p className="profile-form__item-value">Имя</p>
            <input
              className="profile-form__item-value form__input"
              onChange={handleChange}
              name="name"
              type="text"
              value={formValues.name || ""}
            />
          </div>
          <div className="profile-form__item">
            <p className="profile-form__item-value">E-mail</p>
            <input
              className="profile-form__item-value form__input"
              onChange={handleChange}
              name="email"
              type="email"
              value={formValues.email || ""}
            />
          </div>
        </div>
        <div className="profile-form__links">
          
      <span className="profile__message">{profileMessage}</span>
          <button
            className="profile-form__link profile-form__link_submit"
            disabled={!isValid}
            style={!isValid ? { opacity: ".5", color: "grey" } : null}
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
