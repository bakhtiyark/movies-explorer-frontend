import "./AboutMe.css";
import photo from '../../images/about-me-photo.jpg'

function AboutMe() {
  return (
    <section className="about-me">
      <h1 className="about-me__heading">Студент</h1>
      <div className="about-me__info">
        <div className="about-me__text">
          <h2 className="about-me__title">Бахтияр</h2>
          <h3 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h3>
          <p className="about-me__paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna
            molestie at elementum eu facilisis sed odio. Pulvinar mattis nunc
            sed blandit. Viverra adipiscing at in tellus integer feugiat. 
          </p>
          <a href="https://www.github.com/bakhtiyark">Github</a>
        </div>

        <img alt="Фото" src={photo} className="about-me__image"/>
      </div>
    </section>
  );
}

export default AboutMe;
