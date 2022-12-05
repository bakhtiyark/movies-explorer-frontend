import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import isEmail from "validator/lib/isEmail";

// Error messages
import { EMAIL_INCORRECT, SOMETHING_WRONG } from "../../utils/constants";

// Logo
import logo from "../../images/logo.svg";

function Register({ onRegistration }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((x) => ({
      ...x,
      [name]: value,
    }));
    if (name === "email") {
      if (!isEmail(value)) {
        e.target.setCustomValidity(EMAIL_INCORRECT);
      } else {
        e.target.setCustomValidity("");
      }
    }
    setError({ ...error, [name]: e.target.validationMessage() });
    setIsValid(e.target.closest(".register__form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegistration(formValues.password, formValues.email, formValues.name);
  }

  return (
    <div className="register">
      <div className="register__content">
        <img
          src={logo}
          alt="Логотип Movies-Explorer"
          className="register__logo"
        />
        <h3 className="register__title">Добро пожаловать!</h3>
        <form onSubmit={handleSubmit} className="register__form" method="post">
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
              error.email ? "" : "register__form_error_active"
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
            {SOMETHING_WRONG}
          </span>
          <button type="submit" className="register__button">
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
