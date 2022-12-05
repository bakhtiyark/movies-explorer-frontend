import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import { placeholderMovies } from "../../utils/constants";
import "./Movies.css";

//API
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

export default function Movies() {
  // Base values
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchFormInput, setSearchFormInput] = useState("");
  const [searchFormOption, setSearchFormOption] = useState(false);

  // Shown on screen at a given time
  const [moviesShown, setMoviesShown] = useState([]);
  const [moviesShownTumblerEnabled, setMoviesShownTumblerEnabled] = useState(
    []
  );

  useEffect(() => {
    moviesApi
      .getInitialMovies()
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data));
        setMovies(JSON.parse(localStorage.getItem("movies")));
      })
      .catch((err) => console.dir(err));

    mainApi.getSavedMovies().then((data) => {
      setSavedMovies(data)
    }).catch(err => console.dir(err));
  }, []);

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList moviesArray={[]} />
    </section>
  );
}
