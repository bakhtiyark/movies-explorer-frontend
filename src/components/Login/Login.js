import { useState } from "react";
import { Link } from "react-router-dom";

// CSS
import "./Login.css";

// Logo
import logo from "../../images/logo.svg";

function Login({ onLogin }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValues.email, formValues.password);
  }

  return (
    <div className="auth">
      <div className="auth__content">
        <img src={logo} alt="Логотип Movies-Explorer" className="auth__logo" />
        <h3 className="auth__title">Рады видеть!</h3>
        <form onSubmit={handleSubmit} className="auth__form" method="post">
          <label className="auth__form__label">E-mail</label>
          <input
            onChange={handleChange}
            className="auth__input"
            type="email"
            placeholder="Email"
            name="email"
            value={formValues.email || ""}
            required
          />
          <label className="auth__form__label">Пароль</label>
          <input
            onChange={handleChange}
            className="auth__input"
            type="password"
            placeholder="Пароль"
            name="password"
            value={formValues.password || ""}
            required
          />
          <button type="submit" className="auth__button">
            Войти
          </button>
          <p className="auth__text">
            Ещё не зарегистрированы?
            <Link to="./signup" className="auth__link">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
