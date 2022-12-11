import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

// Error messages
import { SOMETHING_WRONG } from "../../utils/constants";

// Logo
import logo from "../../images/logo.svg";
import ValidateForm from "../../utils/ValidateForm";

function Register({ onRegistration, message }) {
  const { formValues, handleChange, error, isValid, resetForm } =
    ValidateForm();

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegistration(formValues);
  }

  return (
    <div className="register">
      <div className="register__content">
        <Link to="/"><img
          src={logo}
          alt="Логотип Movies-Explorer"
          className="register__logo"
        /></Link>
        <h3 className="register__title">Добро пожаловать!</h3>
        <form
          onSubmit={handleSubmit}
          className="register__form form"
          method="post"
        >
          <label className="register__form__label">Имя</label>
          <input
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            value={formValues.name || ""}
            className="register__input"
            name="name"
            type="text"
            required
          />
          <span
            className={`register__form_error ${
              !error.name ? "" : "register__form_error_active"
            }`}
          >
            {error.name}
          </span>
          <label className="register__form__label">E-mail</label>
          <input
            onChange={handleChange}
            value={formValues.email || ""}
            className="register__input"
            name="email"
            type="email"
            required
          />
          <span
            className={`register__form_error ${
              !error.email ? "" : "register__form_error_active"
            }`}
          >
            {error.email}
          </span>
          <label className="register__form__label">Пароль</label>
          <input
            onChange={handleChange}
            value={formValues.password || ""}
            className="register__input"
            name="password"
            type="password"
            required
          />
          <span
            className={`register__form_error ${
              isValid ? "" : "register__form_error_active"
            }`}
          >
            {message}
          </span>
          <button
            type="submit"
            className="register__button"
            disabled={!isValid}
            style={!isValid ? { backgroundColor: "grey", opacity: ".8" } : null}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="register__text">
          Уже зарегистрированы?
          <Link to="./signin" className="register__link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
