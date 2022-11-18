import { Link, Route } from "react-router-dom";

import "./NavTab";

function NavTab() {
  return (
    <div className="header__auth">
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
  );
}

export default NavTab;