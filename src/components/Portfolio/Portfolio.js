import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
        <h1 className="portfolio__heading">Портфолио</h1>
        <ul className="portfolio__list">
            <li className="portfolio__list-item">
            Статичный сайт
            </li>
            <li className="portfolio__list-item">
            Адаптивный сайт
            </li>
            <li className="portfolio__list-item">
            Одностраничное приложение
            </li>
        </ul>
    </section>
  );
}

export default Portfolio;
