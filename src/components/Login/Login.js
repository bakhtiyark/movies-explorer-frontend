import { useEffect } from "react";
import { Link } from "react-router-dom";

import ValidateForm from "../../utils/ValidateForm";
// CSS
import "./Login.css";

// Logo
import logo from "../../images/logo.svg";

function Login({ onLogin, loginMessage }) {
  const { formValues, handleChange, error, isValid, resetForm } =
    ValidateForm();

  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValues);
  }

  return (
    <div className="login">
      <div className="login__content">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип Movies-Explorer"
            className="login__logo"
          />
        </Link>
        <h3 className="login__title">Рады видеть!</h3>
        <form
          onSubmit={handleSubmit}
          className="login__form form"
          method="post"
        >
          <label className="login__form__label">E-mail</label>
          <input
            onChange={handleChange}
            className="login__input"
            type="email"
            placeholder="Email"
            name="email"
            value={formValues.email || ""}
            required
          />
          <span
            className={`register__form_error ${
              !error.email ? "" : "register__form_error_active"
            }`}
          >
            {error.email}
          </span>
          <label className="login__form__label">Пароль</label>
          <input
            onChange={handleChange}
            className="login__input"
            type="password"
            placeholder="Пароль"
            name="password"
            value={formValues.password || ""}
            required
          />
          <span
            className={`register__form_error ${
              !loginMessage ? "" : "register__form_error_active"
            }`}
          >
            {loginMessage}
          </span>
          <button
            type="submit"
            className="login__button"
            disabled={!isValid}
            style={!isValid ? { backgroundColor: "grey", opacity: ".8" } : null}
          >
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?
            <Link to="./signup" className="login__link">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
