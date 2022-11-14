// Импорт компонентов
import Promo from "../Promo/Promo";
import Navtab from "../Navtab/Navtab";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

export default function Main(props) {

  return (
    <main>
      <Promo />
      <Navtab />
      <AboutProject/>
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}
