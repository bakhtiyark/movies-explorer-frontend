import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <h1 className="project__title">О проекте</h1>
      <ul className="project__list">
        <li className="project__list-element">
          <h2 className="project__subtitle">
            Дипломный проект включал 5 этапов
          </h2>
          <p className="project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="project__list-element">
          <h2 className="project__subtitle">
            На выполнение диплома ушло 5 недель
          </h2>
          <p className="project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="project__timeline">
        <div className="project__timeline__backend">
          <div className="project__timeline__backend_duration">1 неделя</div>
          <div className="project__timeline__backend_text">Back-end</div>
        </div>
        <div className="project__timeline__frontend">
          <div className="project__timeline__frontend_duration">4 недели</div>
          <div className="project__timeline__frontend_text">Front-end</div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
