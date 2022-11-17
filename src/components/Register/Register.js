import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

// Logo
import logo from "../../images/logo.svg";

function Register({ onRegistration }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((x) => ({
      ...x,
      [name]: value,
    }));
    setIsValid(e.target.closest(".auth__form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegistration(formValues.password, formValues.email, formValues.name);
  }

  return (
    <div className="auth">
      <img src={logo} alt="Логотип Movies-Explorer" className="auth__logo" />
      <h3 className="auth__title">Добро пожаловать!</h3>
      <form onSubmit={handleSubmit} className="auth__form">
        <label className="auth__form__label">Имя</label>
        <input
          onChange={handleChange}
          value={formValues.name || ""}
          className="auth__input"
          name="name"
          required
        />

        <label className="auth__form__label">E-mail</label>
        <input
          onChange={handleChange}
          value={formValues.email || ""}
          className="auth__input"
          name="email"
          type="email"
          required
        />
        <label className="auth__form__label">Пароль</label>
        <input
          onChange={handleChange}
          value={formValues.password || ""}
          className="auth__input"
          name="password"
          type="password"
          required
        />
        <span
          className={`auth__form_error ${
            isValid ? "" : "auth__form_error_active"
          }`}
        >
          Что-то пошло не так...
        </span>
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
      </form>
      <Link to="./signin" className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
