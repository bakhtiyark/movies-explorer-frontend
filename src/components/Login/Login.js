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
    <div className="login">
      <div className="login__content">
        <img src={logo} alt="Логотип Movies-Explorer" className="login__logo" />
        <h3 className="login__title">Рады видеть!</h3>
        <form onSubmit={handleSubmit} className="login__form" method="post">
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
          <button type="submit" className="login__button">
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
