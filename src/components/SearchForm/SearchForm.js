import { useState, useEffect } from "react";
import "./SearchForm.css";
import ValidateForm from "../../utils/ValidateForm";
import Checkbox from "../Checkbox/Checkbox";

function SearchForm({ onSearch }) {
  const { handleChange } = ValidateForm();
  // текст поиска
  const [searchText, setSearchText] = useState("");
  // состояние чекбокса
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchText) {
    }
    onSearch(searchText, checkbox);
  }

  function handleInputChange(e) {
    handleChange(e)
    setSearchText(e.target.value);
  }

  function handleCheckboxChange(state) {
    setCheckbox(state);
    onSearch(searchText, checkbox);
  }

  return (
    <section className="search">
      <form className="search__form form" onSubmit={handleSubmit} noValidate>
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
      <Checkbox state={checkbox} onChange={handleCheckboxChange} />
    </section>
  );
}

export default SearchForm;
