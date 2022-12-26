import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

export default function Movies({
  moviesShown,
  savedMovies,
  onSearch,
  isSearchComplete,
  isLoading,
  onSaveMovie,
  onDeleteMovie,
  showMore,
  moreMoviesButton
}) {
  //console.log(`# ${moviesShown.length} in Movies.js`)
  return (
    <section className="movies">
      <SearchForm onSearch={onSearch} />
      {isLoading ? (
        <Preloader />
      ) : isSearchComplete ? (
        moviesShown.length > 0 ? (
          <MoviesCardList
            moviesArray={moviesShown}
            savedMovies={savedMovies}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            showMore={showMore}
            moreMoviesButton={moreMoviesButton}
          />
        ) : !isLoading ? (
          <div className="movies__container">
            <span className="movies__text">Ничего не найдено</span>
          </div>
        ) : ``
      ) : (
        ""
      )}
    </section>
  );
}
