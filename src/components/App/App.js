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
import { moviesApi } from "../../utils/MoviesApi.js";
import { mainApi } from "../../utils/MainApi.js";

import { TranslationContext } from "../../contexts/TranslationContext.js";
import NotFound from "../NotFound/NotFound";
import filterResult from "../../utils/filterResult";
import Preloader from "../Preloader/Preloader";
import { MORE_BUTTON_CONFIG } from "../../utils/constants";

function App() {
  const history = useHistory();
  const { pathname } = useLocation();

  //Данные о пользователе
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  // const [lang, setLang] = useState({});

  // Movies
  const [moviesArray, setMoviesArray] = useState([]);
  const [moviesShown, setMoviesShown] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Saved movies
  const [savedMovies, setSavedMovies] = useState([]);

  // For "More" button manipulations
  const [moreMoviesButton, setMoreMoviesButton] = useState(false);

  // Search process
  const [searchInput, setSearchInput] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  // Сообщение статуса
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

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

  // For Loading
  function loadPreloader() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }

  // Поиск
  function handleSearchMovie(searchInput, state) {
    loadPreloader();
    setMoviesShown([]);
    setSearchInput(searchInput);
    setCheckbox(state);
    const localStorageMoviesArray = JSON.parse(localStorage.getItem("moviesArray"));

    if (!localStorageMoviesArray) {
      setIsLoading(true);
      moviesApi
        .getInitialMovies()
        .then((data) => {
          setMoviesArray(data);
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

  function getCardCount(renderConfig) {
    let count;
    const clientWidth = window.innerWidth;
    Object.keys(renderConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth >= +key) {
          count = renderConfig[key];
        }
      });

    return count;
  }

  const config = getCardCount(MORE_BUTTON_CONFIG);
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
    setIsLoading(true);
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
      })
      .finally(setIsLoading(false));
  }
  // Update User
  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .setUserInfo(data)
      .then((x) => {
        setCurrentUser(x);
        setProfileMessage("Данные успешно обновлены!");
      })
      .catch((err) => {
        setProfileMessage(err);
      })
      .finally(setIsLoading(false));
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
  const handleSaveMovies = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((x) => {
        const updatedArray = [...savedMovies, { ...x, id: x.movieId }];
        setSavedMovies(updatedArray);
        localStorage.setItem("savedMovies", JSON.stringify(updatedArray));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleTokenValidation();
  }, []);
  const handleDeleteMovie = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(x => x._id !== movie._id)
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch(err => console.log(err))
  };
  useEffect(() => {
    if (localStorage.getItem("moviesSearch")) {
      const searchBasis = JSON.parse(localStorage.getItem("moviesSearch"));
      console.log(searchBasis)
      const searchResult = filterResult(searchBasis, searchInput, checkbox);
      setFilteredMovies(searchResult);
      setIsSearchComplete(true);
    }
  }, [checkbox]);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies().then((res) => {
        const searchSavedMovies = res.filter(
          (x) => x.owner._id === currentUser._id
        );
        localStorage.setItem("savedMovies", JSON.stringify(searchSavedMovies));
        setSavedMovies(searchSavedMovies);
        setIsSearchComplete(true);
      });
    }
  }, [loggedIn, currentUser]);

  useEffect(() => {
    if (moviesArray.length > 0) {
      
      const filteredResult = filterResult(moviesArray, searchInput, checkbox);
      localStorage.setItem("moviesSearch", JSON.stringify(filteredResult));
      localStorage.setItem("searchInput", searchInput);
      localStorage.setItem("checkbox", checkbox);
      setFilteredMovies(filteredResult);
      setIsSearchComplete(true);
    }
  }, [moviesArray, searchInput, checkbox]);

  useEffect(() => {
    if (moviesShown.length === filteredMovies.length) {
      setMoreMoviesButton(false);
    }
  }, [moviesShown, filteredMovies]);

  useEffect(() => {
    if (filteredMovies.length > 0) {
      //console.log(config[0])
      if (filteredMovies.length > config[0]) {
        setMoviesShown(filteredMovies.slice(0, config[0]));
        setMoreMoviesButton(true);
      } else {
        setMoviesShown(filteredMovies);
      }
    }
  }, [loggedIn, filteredMovies, config]);

  const showMore = () => {
    setMoviesShown((x) => filteredMovies.slice(0, x.length + config[1]));
  };

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
              moviesArray={moviesArray}
              moviesShown={moviesShown}
              savedMovies={savedMovies}
              component={Movies}
              isLoading={isLoading}
              isSearchComplete={isSearchComplete}
              searchInput={searchInput}
              onSearch={handleSearchMovie}
              onSaveMovie={handleSaveMovies}
              onDeleteMovie={handleDeleteMovie}
              showMore={showMore}
              moreMoviesButton={moreMoviesButton}
            />

            <ProtectedRoute
              path="/saved-movies"
              loggedIn={!loggedIn}
              component={SavedMovies}
              savedMovies={savedMovies}
              moviesArray={savedMovies}
              onDeleteMovie={handleDeleteMovie}
            />

            <ProtectedRoute
              path="/profile"
              loggedIn={!loggedIn}
              component={Profile}
              onSignOut={handleSignOut}
              onUpdate={handleUpdateUser}
              profileMessage={profileMessage}
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
