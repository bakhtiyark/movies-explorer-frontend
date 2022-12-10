import { SHORT_MOVIE_DURATION } from "./constants";

export default function filterResult(moviesArray, input = "", checkboxState) {
  let array = moviesArray;

  if (!checkboxState) {
    array = array.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
  }
  return array.filter((movie) => movie.nameRU.toLowerCase().includes(input.toLowerCase()));
}
