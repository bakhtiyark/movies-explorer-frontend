import { useState, useEffect } from "react";
import "./SearchForm.css";
import ValidateForm from "../../utils/ValidateForm";
import Checkbox from "../Checkbox/Checkbox";
import { SEARCH_MESSAGE } from "../../utils/constants";

function SearchForm({ onSearch }) {
  const { formValues, handleChange } = ValidateForm();

  // состояние чекбокса
  const [checkbox, setCheckbox] = useState(false);

  const [err, setErr] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValues.search) {
      setErr(true);
    } else {
      onSearch(formValues.search, !checkbox);
    }
  }

  function handleInputChange(e) {
    handleChange(e);
  }

  function handleCheckboxChange(state) {
    setCheckbox(state);
    onSearch(formValues.search, checkbox);
  }
  function toggleState(e) {
    handleCheckboxChange(e.target.checked);
  }

  return (
    <section className="search">
      <form className="search__form form" onSubmit={handleSubmit} noValidate>
        <input
          className="search__input"
          value={formValues.search || ""}
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

      <Checkbox state={checkbox} onChange={toggleState} />
    </section>
  );
}

export default SearchForm;
