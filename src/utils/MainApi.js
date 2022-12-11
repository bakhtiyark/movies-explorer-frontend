class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  /* _errorCheck = res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(new Error("Ошибка " + res.status))
    }
    */

  // Login and Registration

  register({ password, email, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }
  updateToken() {
    this._headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  tokenValid(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  // User-related manipulations

  //Получение данных о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  //Обновление пользователя
  setUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res)
          return res;
        }
      })
      .catch((err) => console.log(err));
  }

  /*
  //Установка аватара
  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  } */

  //Movies
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }
  //Добавление карт
  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movie),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  //Комбинированный метод для сохранения/удаления
  changeMovieStatus(movie, id) {
    return !id
      ? fetch(`${this._baseUrl}/movies`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify(movie),
        })
      : fetch(`${this._baseUrl}/movies`, {
          method: "DELETE",
          headers: this._headers,
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .catch((err) => console.log(err));
  }

  //Удаление карточки
  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.moviesexplorerbk.nomoredomains.icu",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
