import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <h1 className="project__title">О проекте</h1>
      <ul className="project__list">
        <li className="project__list">
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
    </section>
  );
}

export default AboutProject;
