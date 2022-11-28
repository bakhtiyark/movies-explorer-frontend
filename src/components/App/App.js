//React компоненты
import { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";

// CSS file
import "./App.css";

//Родные компоненты
import Header from "../Header/Header";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Profile from "../Profile/Profile.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Movies from "../Movies/Movies.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";

//Контексты
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

//Api
// import { api } from "../../utils/Api.js";
import auth from "../../utils/Auth.js";

import { TranslationContext } from "../../contexts/TranslationContext.js";
import NotFound from "../NotFound/NotFound";

const deblocking = true;

function App() {
  let history;
  history = useHistory();
  //Данные о пользователе
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  // const [lang, setLang] = useState({});
  const { pathname } = useLocation();
  // Сообщение статуса
  const [message, setMessage] = useState(false);

  useEffect(() => {
    handleTokenValidation();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  //Токен
  function handleTokenValidation() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .tokenValid(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          setLoggedIn(false);
        });
    }
  }

  // Регистрация
  function handleRegistration(password, email, name) {
    auth
      .register(password, email, name)
      .then((res) => {
        if (res) {
          if (res) {  
            handleLogin(res.email, password);
          }
        }
      })
      .catch(setMessage(true));
  }

  //Вход по логину
  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          auth.updateToken();
          setLoggedIn(true);
          handleTokenValidation();
          history.push('/movies')
        }
      })
      .catch((err) => {
        setMessage(err);
      });
  }

  //Выход из аккаунта

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/signin");
  }

  /*
  let currentUserWithLang = currentUser.push(lang)
  console.log(currentUserWithLang)
  */

  return (
    <TranslationContext.Provider value={""}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          {pathname === "/" ||
          pathname === "/profile" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ? (
            <Header loggedIn={!loggedIn} />
          ) : (
            ""
          )}
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>

            <ProtectedRoute
              path="/movies"
              loggedIn={deblocking}
              component={Movies}
            />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={deblocking}
              component={SavedMovies}
            />

            <ProtectedRoute
              path="/profile"
              loggedIn={deblocking}
              component={Profile}
              onSignOut={handleSignOut}
            />

            <Route path="/signup">
              {!loggedIn ? (
                <Register onRegistration={handleRegistration} />
              ) : ( 
                <Redirect to="/movies" />
              )}
            </Route>

            <Route path="/signin">
              {!loggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Redirect to="/movies" />
              )}
            </Route>

            <Route path="/*">
              <NotFound />
            </Route>
          </Switch>
          {pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ? (
            <Footer />
          ) : (
            ""
          )}
        </div>
      </CurrentUserContext.Provider>
    </TranslationContext.Provider>
  );
}

export default withRouter(App);
