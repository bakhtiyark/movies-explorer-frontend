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
import { moviesApi } from "../../utils/moviesApi.js";
import { mainApi } from "../../utils/MainApi.js";

import { TranslationContext } from "../../contexts/TranslationContext.js";
import NotFound from "../NotFound/NotFound";
import Preloader from "../Preloader/Preloader";

const deblocking = true;

function App() {
  const history = useHistory();
  
  //Данные о пользователе
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  // const [lang, setLang] = useState({});
  const { pathname } = useLocation();
  
  // Movies
  const [moviesArray, setMoviesArray] = useState([]);
  const [moviesShown, setMoviesShown] = useState([]);

  // текст поиска
  const [searchText, setSearchText] = useState("");
  // состояние чекбокса
  const [checkbox, setCheckbox] = useState(false);

  // Сообщение статуса
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleTokenValidation();
  }, []);

  //Токен
  function handleTokenValidation() {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoading(true);
      mainApi
        .tokenValid(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          setLoggedIn(false);
        })
        .finally(() => setIsLoading(false));
    }
  }

  // Регистрация
  function handleRegistration(password, email, name) {
    setIsLoading(true);
    mainApi
      .register(password, email, name)
      .then((res) => {
        if (res) {
          if (res) {
            handleLogin(password, res.email);
          }
        }
      })
      .catch(setMessage(true))
      .finally(() => setIsLoading(false));
  }

  //Вход по логину
  function handleLogin(password, email) {
    mainApi
      .login(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          mainApi.updateToken();
          setLoggedIn(true);
          handleTokenValidation();
          history.push("/movies");
        }
      })
      .catch((err) => {
        setMessage(err);
      });
  }

  //Выход из аккаунта

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
  }

  // Возрат на предыдущую страницу
  function goBack() {
    history.goBack();
  }

  // Поиск
  function handleSearchMovie(searchText, state) {;
    setMoviesShown([]);
    setSearchText(searchText);
    setCheckbox(state);

    const localStorageMoviesArray = localStorage.getItem("moviesArray");
    if (!localStorageMoviesArray) {
      setIsLoading(true);
      moviesApi
        .getInitialMovies()
        .then((data) => {
          setMoviesArray(JSON.parse(localStorage.getItem("moviesArray")));
          localStorage.setItem("moviesArray", JSON.stringify(data));
        })
        .catch((err) => console.dir(err))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setMoviesArray(localStorageMoviesArray);
    }
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
              loggedIn={!loggedIn}
              component={Movies}
            />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={!loggedIn}
              component={SavedMovies}
            />

            <ProtectedRoute
              path="/profile"
              loggedIn={!loggedIn}
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
              <NotFound goBack={goBack} />
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
