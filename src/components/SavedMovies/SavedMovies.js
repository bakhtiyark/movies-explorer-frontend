import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import filterResult from "../../utils/filterResult";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({ savedMovies, onDeleteMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Search process
  const [searchInput, setSearchInput] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  // For preloader
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSearchSavedMovies(searchInput, checkbox) {
    loadPreloader();

    const filteredResult = filterResult(savedMovies, searchInput, checkbox);

    setSearchInput(searchInput);
    setCheckbox(checkbox);
    setFilteredMovies(filteredResult);
    setIsSearchComplete(true);

    //console.dir(filteredResult);
  }
  // For Loading
  function loadPreloader() {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }

  useEffect(() => {
    if (filteredMovies.length > 0) {
      const filteredResult = filterResult(savedMovies, searchInput, checkbox);

      setFilteredMovies(filteredResult);
    }
  }, [savedMovies]);

  return (
    <section className="saved-movies">
      <SearchForm onSearch={handleSearchSavedMovies} />
      {isLoading ? (
        <Preloader />
      ) : isSearchComplete ? (
        filteredMovies.length > 0 ? (
          <MoviesCardList
            moviesArray={filteredMovies}
            savedMovies={savedMovies}
            onDeleteMovie={onDeleteMovie}
          />
        ) : (
          <div className="movies__container">
            <span className="movies__text">Ничего не найдено</span>
          </div>
        )
      ) : (
        <MoviesCardList
          moviesArray={savedMovies}
          savedMovies={savedMovies}
          onDeleteMovie={onDeleteMovie}
        />
      )}
    </section>
  );
}
