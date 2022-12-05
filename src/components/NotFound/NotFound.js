import "./NotFound.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function NotFound({goBack}) {
  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Страница не найдена</h2>
      <button onClick={goBack} className="not-found__link">
        Назад
      </button>
    </section>
  );
}

export default NotFound;
