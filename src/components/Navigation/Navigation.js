import {
  NavLink,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

import accountIcon from "../../images/account-icon.svg";

import "./Navigation.css";

function Navigation() {
  const { pathname } = useLocation();
  const navigationClassName = `navigation__link ${
    pathname === "/" ? "navigation__link_main" : ""
  }`;

  return (
    <nav className="navigation">
      <input className="navigation__toggle" id="toggle" type="checkbox" />
      <label className="navigation__button" htmlFor="toggle">
        <span className="navigation__icon" />
      </label>
      <div className="navigation__container">
        <ul className="navigation__items">
          <li className="navigation__item navigation__item_main">
            <NavLink className={navigationClassName} to="/">
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink className={navigationClassName} to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink className={navigationClassName} to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className="navigation__item navigation__item_account">
          <NavLink
            className="navigation__link navigation__link_account"
            to="/profile"
          >
            Аккаунт
            <img
              className="navigation__link-icon"
              src={accountIcon}
              alt="Иконка аккаунта"
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
