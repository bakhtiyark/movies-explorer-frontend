// CSS
import "./Header.css";

// Logo
import logo from "../../images/logo.svg";

// Imports
import { Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";

import toggleList from "../../utils/toggleList";

// Context
import { translations } from "../../contexts/TranslationContext";
import { TranslationContext } from "../../contexts/TranslationContext";

function Header({ onSignOut, userEmail }) {
  const translation = useContext(TranslationContext);
  return (
    <header className="header">
      <img src={logo} alt="Логотип Movies-Explorer" className="header__logo" />
      <Switch>
        <div className="auth">
          <Route path="/">
            <Link
              className="header__link header__link_location-header"
              to="/signup"
            >
              Регистрация
            </Link>
            <Link
              className="header__button header__link_location-header"
              to="/signin"
            >
              Войти
            </Link>
          </Route>
        </div>
      </Switch>
    </header>
  );
}

export default Header;
