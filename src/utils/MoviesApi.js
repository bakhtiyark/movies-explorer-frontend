export class MoviesApi {
    constructor({ baseUrl, headers }) {
      this._url = baseUrl;
      this._headers = headers;
    }

    //Получение карт с сервера
    getInitialMovies() {
      return fetch(`${this._url}/movies`, {
        headers: this._getHeaders(),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((err) => console.log(err));
    }
  }
  
  export const moviesApi = new MoviesApi({
    baseUrl: "https://api.moviesexplorerbk.nomoredomains.icu",
    headers: {
      "Content-Type": "application/json",
    },
  });
  