import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <h6 className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h6>
      <ul className="footer__items">
        <p className="footer__copyright">© 2022 Bakhtiyark</p>
        <a className="footer__link" href="practicum.yandex.ru">Яндекс.Практикум</a>
        <a className="footer__link" href="https://www.github.com/bakhtiyark">Github</a>
      </ul>
    </footer>
  );
}
export default Footer;
