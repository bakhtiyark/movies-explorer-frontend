import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <h6 className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h6>
      <div className="footer__items">
        <p className="footer__copyright">© 2022 Bakhtiyark</p>
        <ul className="footer__links">
          <li className="footer__item">
            <a className="footer__link" href="practicum.yandex.ru">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              className="footer__link"
              href="https://www.github.com/bakhtiyark"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
