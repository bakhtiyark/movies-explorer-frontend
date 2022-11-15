// Stylesheet
import './Promo.css'

// Decoration 
import deco from '../../images/landing-decoration.svg'
function Promo(){
    return(
        <div className='promo'>
            <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
            <img src={deco} className='promo__image' alt='Декоративная завитушка' />
        </div>
    )
}

export default Promo;