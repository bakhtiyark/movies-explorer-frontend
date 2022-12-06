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
  searchStatus,
  onSaveMovie,
  onDeleteMovie,
  showMore,
  onRenderMovies,
}) {
  return (
    <section className="movies">
      <SearchForm onSearch={onSearch} />
      {isLoading ? (
        <Preloader />
      ) : isSearchComplete ? (
        moviesShown.length > 0 ? (
          <MoviesCardList
            movies={moviesShown}
            savedMovies={savedMovies}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            isLoading={isLoading}
            isSearchComplete={isSearchComplete}
            onRenderMovies={onRenderMovies}
            showMore={showMore}
          />
        ) : !isLoading ? (
          <div className="movies__container">
            <span className="movies__text">Ничего не найдено</span>
          </div>
        ) : (
          <div className="movies__container">
            <span className="movies__text">{searchStatus}</span>
          </div>
        )
      ) : (
        ""
      )}
    </section>
  );
}
