import { SHORT_MOVIE_DURATION } from "./constants";

export default function filterDuration(array) {
  return array.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
}
