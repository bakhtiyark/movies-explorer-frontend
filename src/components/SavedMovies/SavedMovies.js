import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import filterResult from "../../utils/filterResult";

export default function SavedMovies({ moviesArray, onDeleteMovie }) {
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Search process
  const [searchInput, setSearchInput] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  function handleSearch(searchInput, checkbox) {
    const filteredResult = filterResult(moviesArray, searchInput, checkbox);
    setSearchInput(searchInput);
    setCheckbox(checkbox);
    setFilteredMovies(filteredResult);
  }
  useEffect(() => {
    if (filteredMovies.length > 0) {
      const filteredResult = filterResult(moviesArray, searchInput, checkbox);

      setFilteredMovies(filteredResult);
    }
  }, [moviesArray]);

  return (
    <section className="saved-movies">
      <SearchForm onSearch={handleSearch} />
      <MoviesCardList
        moviesArray={moviesArray}
        savedMovies={moviesArray}
        onDeleteMovie={onDeleteMovie}
      />
    </section>
  );
}
