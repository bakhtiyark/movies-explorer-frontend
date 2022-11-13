//React компоненты
import { useEffect, useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

// CSS file
import "./App.css";

//Родные компоненты
import Header from "../Header/Header";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import Register from "../Login/Register.js";
import Login from "../Login/Login";

//Контексты
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

//Api
import { api } from "../../utils/Api.js";
import auth from "../../utils/Auth.js";

import { TranslationContext } from "../../contexts/TranslationContext.js";

function App() {
  let history;
  history = useHistory();
  //Данные о пользователе
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  // const [lang, setLang] = useState({});

  //Карты
  const [cards, setCards] = useState([]);

  // Сообщение статуса
  const [message, setMessage] = useState({});

  useEffect(() => {
    handleTokenValidation();
    if (loggedIn) {
      api
        .getAllData()
        .then(([data, user]) => {
          setCards(data);
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

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
            setUserEmail(res.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Регистрация
  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          setMessage({
            text: "Вы успешно зарегистрировались!",
          });
          history.push("/sign-in");
        }
      })
      .catch(
        setMessage({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        })
      );
  }

  //Вход по логину
  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setUserEmail(email);
          setLoggedIn(true);
        }
      })
      .catch(() => {
        setMessage({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  }

  //Выход из аккаунта

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  /*
  let currentUserWithLang = currentUser.push(lang)
  console.log(currentUserWithLang)
  */

  return (
    <TranslationContext.Provider value={""}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignOut={handleSignOut} userEmail={userEmail} />

        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} />

          <Route path="/sign-up">
            <Register onRegistration={handleRegistration} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <script type="module" src="./pages/index.js"></script>
      </CurrentUserContext.Provider>
    </TranslationContext.Provider>
  );
}

export default App;
