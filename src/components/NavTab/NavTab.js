import { Link, Route } from "react-router-dom";

import "./NavTab.css";

function NavTab() {
  return (
    <div className="navigation-auth">
      <Route path="/">
        <Link className="navigation-auth__link" to="/signup">
          Регистрация
        </Link>
        <Link className="navigation-auth__button" to="/signin">
          Войти
        </Link>
      </Route>
    </div>
  );
}

export default NavTab;
