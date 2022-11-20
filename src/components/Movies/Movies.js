import { useState, useEffect } from 'react';

import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

import "./Movies.css"

export default function Movies(props) {

  return (
    <main>
      <SearchForm />
    </main>
  );
}
