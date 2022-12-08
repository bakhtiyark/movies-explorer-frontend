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
  const [initialMovies, setInitialMovies] = useState(0);
  const [moreMovies, setMoreMovies] = useState(0);

  // Search process
  const [searchText, setSearchText] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [isSearchComplete, setIsSearchComplete] = useState(false);

  // Сообщение статуса
  const [message, setMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

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
  useEffect(() => {
    if (moviesArray.length > 0){
      const filteredResult = filterResult(moviesArray, searchText, checkbox);
      localStorage.setItem("moviesArray", JSON.stringify(filteredResult));
      localStorage.setItem("searchText", searchText);
      localStorage.setItem("checkbox", checkbox);
      setFilteredMovies(filteredResult);
      setIsSearchComplete(true);
    }
  },[moviesArray, searchText, checkbox]);

  // For Loading
  function loadPreloader(){
    setIsLoading(true);
    setTimeout(()=> setIsLoading(false), 400)
      }

  useEffect(() => {
    if (localStorage.getItem("moviesArray")) {
      const searchBasis = JSON.parse(localStorage.getItem("moviesArray"));
      const searchResult = filterResult(searchBasis, searchText, checkbox);
      setFilteredMovies(searchResult)
      setIsSearchComplete(true)
    }
  }, [currentUser]);

  // Поиск
  function handleSearchMovie(searchText, state) {
    loadPreloader();
    setMoviesShown([]);
    setSearchText(searchText);
    setCheckbox(state);

    const localStorageMoviesArray = JSON.parse(localStorage.getItem('moviesArray'));

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

  useEffect(() => {
    // For Saved Movies
    if (loggedIn) {
      mainApi
        .getSavedMovies()
        .then((res) => {          
          const filterSavedMovies = res.filter((movie) => movie.owner._id === currentUser._id);
          localStorage.setItem("savedMovies", JSON.stringify(filterSavedMovies));
          setSavedMovies(filterSavedMovies);
        })
        .catch((err) => console.dir(err));
    }
  }, [loggedIn]);

  /*
  let currentUserWithLang = currentUser.push(lang)
  console.log(currentUserWithLang)
  */

  // TO BE REFACTORED
  /*
const handleSaveMovies = (movie) => {
  mainApi
    .saveMovie(movie)
    .then((x) => {
      setSavedMovies(savedMovies.push(x));
    })
    .catch((err) => console.log(err));
};
function handleMoreClick() {
  const spliceMovies = moviesArray;
  const newMoviesArray = moviesShown.concat(
    spliceMovies.splice(0, moviesCount[1])
  );
  setMoviesShown(newMoviesArray);
  setMovies(spliceMovies);
}


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
              isLoading={isLoading}
              isSearchComplete={isSearchComplete}
              currentUser={currentUser}
              moviesShown={moviesShown}
              onSearch={handleSearchMovie}
              savedMovies={savedMovies}
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
