import { useState, useContext, useEffect } from "react";
import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

import ValidateForm from "../../utils/ValidateForm";
import { SAME_VALUE } from "../../utils/constants";

function Profile({ onUpdate, onSignOut, profileMessage }) {
  const {
    formValues,
    setFormValues,
    handleChange,
    error,
    setError,
    isValid,
    setIsValid
  } = ValidateForm();

  const currentUser = useContext(CurrentUserContext);
  const [name,setName] = useState("")
  useEffect(() => {
    setFormValues(currentUser);
  }, [currentUser, setFormValues]);

  function handleNameChange(e) {
    if (e.target.value === currentUser.name){
      setIsValid(false);
      setError({
        error: error.name,
        [e.target.name]: SAME_VALUE
      })
    } else{
      handleChange(e)
    }
  }
  function handleEmailChange(e) {
    if (e.target.value === currentUser.email){
      setIsValid(false);
      setError({
        error: error.name,
        [e.target.name]: SAME_VALUE
      })
    } else{
      handleChange(e)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(formValues);
  }


  return (
    <section className="profile">
      <form className="profile-form form" onSubmit={handleSubmit}>
        <div className="profile-form__content">
          <h1 className="profile-form__title">Привет, {name}!</h1>
          <div className="profile-form__item">
            <p className="profile-form__item-value">Имя</p>
            <input
              className="profile-form__item-value form__input"
              onChange={handleNameChange}
              name="name"
              type="text"
              value={formValues.name || ""}
            />
          </div>
          <span
            className={`register__form_error ${
              !error.name ? "" : "register__form_error_active"
            }`}
          >
            {error.name}
          </span>
          <div className="profile-form__item">
            <p className="profile-form__item-value">E-mail</p>
            <input
              className="profile-form__item-value form__input"
              onChange={handleEmailChange}
              name="email"
              type="email"
              value={formValues.email || ""}
            />
          </div>
          <span
            className={`register__form_error ${
              !error.email ? "" : "register__form_error_active"
            }`}
          >
            {error.email}
          </span>
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
