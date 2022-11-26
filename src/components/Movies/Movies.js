import { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";
import { placeholderMovies } from "../../utils/constants";
import "./Movies.css";
import { api } from "../../utils/Api";

export default function Movies() {
  const [movies, setMovies] = useState();
  const [saveMovies, setSaveMovies] = useState([]);
  const [searchFormInput, setSearchFormInput] = useState("");
  const [searchFormOption, setSearchFormOption] = useState(false);

  useEffect(() => {
    api.getInitialMovies().then((data) => {
      localStorage.setItem("movies", JSON.stringify(data))
      console.log(data)
    });
  },[]);

  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList 
      moviesArray={placeholderMovies} />
    </section>
  );
}
