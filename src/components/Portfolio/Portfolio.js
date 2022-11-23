import "./Portfolio.css";
import link from "../../images/link-icon.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h1 className="portfolio__heading">Портфолио</h1>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-item_link"
            href="https://github.com/bakhtiyark/how-to-learn"
          >
            <p>Статичный сайт</p>
            <img alt="Стрелочка" src={link} />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-item_link"
            href="https://github.com/bakhtiyark/russian-travel"
          >
            <p>Адаптивный сайт</p>
            <img alt="Стрелочка" src={link} />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__list-item_link"
            href="https://github.com/bakhtiyark/react-mesto-api-full"
          >
            <p>Одностраничное приложение</p>
            <img alt="Стрелочка" src={link} />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
