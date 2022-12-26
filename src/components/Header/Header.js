// CSS
import "./Header.css";

// Logo
import logo from "../../images/logo.svg";
import accountIcon from "../../images/account-icon.svg";

// Imports
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { useContext } from "react";

import NavTab from "../NavTab/NavTab";
import Navigation from "../Navigation/Navigation";

// Context
import { translations } from "../../contexts/TranslationContext";
import { TranslationContext } from "../../contexts/TranslationContext";

function Header({ loggedIn }) {
  const { pathname } = useLocation();
  const translation = useContext(TranslationContext);
  const headerClassName = `header ${
    pathname === "/"
      ? "header_main"
      : ""
  }`;

  return (
    <header className={headerClassName}>
      <Link to="/">
        <img
          src={logo}
          alt="Логотип Movies-Explorer"
          className="header__logo"
        />
      </Link>
      <Switch>
        {!loggedIn ? (
          <Navigation />
        ) : (
          <NavTab />
        )}
      </Switch>
    </header>
  );
}

export default Header;
