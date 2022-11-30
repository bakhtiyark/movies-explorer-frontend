import { useState, useEffect } from "react";
import "./SearchForm.css";

function SearchForm({
  handleGetMovies,
  handleGetMoviesTumbler,
  moviesTumbler,
  moviesInputSearch,
}) {
  // текст поиска
  const [searchText, setSearchText] = useState("");
  // состояние чекбокса
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    setCheckbox(moviesTumbler);
    setSearchText(moviesInputSearch);
  }, [moviesTumbler, moviesInputSearch]);

  function handleSubmit(e) {
    e.preventDefault();
    handleGetMovies(searchText, checkbox);
  }

  function handleInputChange(e) {
    setSearchText(e.target.value);
  }

  function handleCheckboxChange() {
    setCheckbox(!checkbox);
    handleGetMoviesTumbler(!checkbox);
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          value={searchText || ""}
          onChange={handleInputChange}
          type="text"
          name="search"
          placeholder="Фильм"
          required
        />
        <button className="search__button" type="submit">
          Поиск
        </button>
      </form>
      <div className="search__toggler">
        <label className="switch">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            value={checkbox}
            checked={!checkbox}
            required
          />
          <span className="slider round"></span>
        </label>
        <p className="search__toggler-text">Короткометражки</p>
      </div>
      
    </section>
  );
}

export default SearchForm;
