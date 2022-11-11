import "./Header.css";
import logo from "../../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";
import toggleList from "../../utils/toggleList";
import { translations } from "../../contexts/TranslationContext";
import { TranslationContext } from "../../contexts/TranslationContext";
import { useContext } from "react";

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
              to="/sign-up"
            >
              Регистрация
            </Link>
            <Link
              className="header__button header__link_location-header"
              to="/sign-in"
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
