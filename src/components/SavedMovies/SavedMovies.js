import { useEffect, useState } from "react";
import { placeholderSavedMovies } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  return (
    <section className="saved-movies">
      <SearchForm />
      <div className="saved-movies__line" />
      <MoviesCardList
      moviesArray={placeholderSavedMovies}
      />
    </section>
  );
}
