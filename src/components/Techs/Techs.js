import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h1 className="techs__heading">Технологии</h1>
      <h2 className="techs__title">7 технологий</h2>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__stack">
        <li className="techs__tile">HTML</li>
        <li className="techs__tile">CSS</li>
        <li className="techs__tile">JS</li>
        <li className="techs__tile">React</li>
        <li className="techs__tile">Git</li>
        <li className="techs__tile">Express.js</li>
        <li className="techs__tile">MongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
