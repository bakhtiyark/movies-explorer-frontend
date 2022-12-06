import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

//API
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

export default function Movies() {
  // Base values
  const [movies, setMovies] = useState([]);
  const [moviesArray, setMoviesArray] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  // Preloader
  const [preloader, setPreloader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Shown on screen at a given time
  const [moviesShown, setMoviesShown] = useState([]);
  const [moviesCount, setMoviesCount] = useState([]);

  const [shortMovies, setShortMovies] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);

  
  // текст поиска
  const [searchText, setSearchText] = useState("");
  // состояние чекбокса
  const [checkbox, setCheckbox] = useState(false);

  // Errors
  const [error, setError] = useState("");

  //Rendering cards & saving states
  useEffect(() => {
    moviesApi
      .getInitialMovies()
      .then((data) => {
        localStorage.setItem("moviesArray", JSON.stringify(data));
        setMoviesArray(JSON.parse(localStorage.getItem("moviesArray")));
      })
      .catch((err) => console.dir(err));

    setMoviesCount(renderCounter());

    // For Saved Movies
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => console.dir(err));

    const localStorageMovies = localStorage.getItem("moviesArray");

    if (localStorageMovies) {
      setMoviesShown(
        JSON.parse(localStorageMovies).splice(0, renderCounter()[0])
      );
      setMovies(JSON.parse(localStorageMovies));
      setPreloader(false);
    }
  }, []);

  function filterDuration(array) {
    return array.filter(({ duration }) => duration <= 40);
  }
  function handleShortMovies() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredArray(filterDuration(moviesArray));
    }
    localStorage.setItem("shortMovies", !shortMovies);
  }

  const saveMovies = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((x) => {
        setSavedMovies(savedMovies.push(x));
      })
      .catch((err) => console.log(err));
  };

  // Render more cards per screensize
  function renderCounter() {
    let cardsCount;
    const clientWidth = window.screen.width;

    // Screensize: [Movies shown at the time, extra movies to be shown upon click]
    const MoreButtonConfig = {
      1200: [12, 3],
      768: [8, 2],
      320: [5, 2],
    };
    Object.keys(MoreButtonConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          cardsCount = MoreButtonConfig[key];
        }
      });

    return cardsCount;
  }
  function handleMoreClick() {
    const spliceMovies = moviesArray;
    const newMoviesArray = moviesShown.concat(
      spliceMovies.splice(0, moviesCount[1])
    );
    setMoviesShown(newMoviesArray);
    setMovies(spliceMovies);
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
  
  return (
    <section className="movies">
      <SearchForm
      onSearch={handleSearchMovie} />
      {preloader && <Preloader />}
      <MoviesCardList
        shownArray={moviesShown}
        savedMovies={savedMovies}
        savedMoviesToggle={saveMovies}
        moviesArray={moviesArray}
        showMore={handleMoreClick}
      />
    </section>
  );
}
