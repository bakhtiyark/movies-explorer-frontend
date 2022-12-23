import { useState, useEffect } from "react";
import "./SearchForm.css";
import ValidateForm from "../../utils/ValidateForm";
import Checkbox from "../Checkbox/Checkbox";
import { SEARCH_MESSAGE } from "../../utils/constants";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function SearchForm({ onSearch }) {
  const { handleChange } = ValidateForm();
  const { pathname } = useLocation();

  // состояние
  const [searchInput, setSearchInput] = useState("");
  const [checkboxState, setCheckboxState] = useState(false);

  const [err, setErr] = useState(false);

  useEffect(() => {
    if (pathname === "/movies") {
      const searchInput = localStorage.getItem("searchInput");
      const checkbox = localStorage.getItem("checkbox");
      if (searchInput) {
        setSearchInput(searchInput);
      }
      if (JSON.parse(checkbox) === true) {
        setCheckboxState(true);
      } else {
        setCheckboxState(false);
      }
    }
  }, [pathname]);

  function handleInputChange(e) {
    handleChange(e);
    setSearchInput(e.target.value);
  }

  function handleCheckboxChange() {
    setCheckboxState(!checkboxState);
    onSearch(searchInput, !checkboxState);
  }
  function toggleState(e) {
    handleCheckboxChange(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchInput) {
      setErr(true);
    } else {
      onSearch(searchInput, checkboxState);
    }
  }
  return (
    <section className="search">
      <form className="search__form form" onSubmit={handleSubmit} noValidate>
        <input
          className="search__input"
          value={searchInput || ""}
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
      {err ? (
        <span className="search__form_error search__form_error_active">
          {SEARCH_MESSAGE}
        </span>
      ) : (
        ""
      )}

      <Checkbox state={checkboxState} onChange={toggleState} />
    </section>
  );
}

export default SearchForm;
