import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function Movies(props) {

  return (
    <main>
      <SearchForm />
      <Preloader />
      <MoviesCardList />
      <MoviesCard />
    </main>
  );
}
