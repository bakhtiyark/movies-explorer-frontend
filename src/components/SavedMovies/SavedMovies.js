import { useEffect, useState } from "react";
import { placeholderSavedMovies } from "../../utils/constants";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);
  
  return (
    <section className="saved-movies">
      <SearchForm
        handleGetMovies = {null}
        handleGetMoviesTumbler={null}
        moviesTumbler ={null}
        moviesInputSearch = {null}
      />
      {preloader && <Preloader />}
      <MoviesCardList
        shownArray={[]}
        savedMovies={savedMovies}
        savedMoviesToggle={null}
        movieArray={[]}
        showMore={null}
      />
    </section>
  );
}
