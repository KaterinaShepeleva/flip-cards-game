import './Card.css';
import { CARD_UNKNOWN } from '/src/constants.js';

function Card(props) {
    const { position, content, flipped, onCardClick } = props;
    
    const cardClassName = ['card', flipped ? 'flipped' : ''].join(' ');
    const flipCard = () => {
        onCardClick(position)
    }
    
    return (
        <li className={cardClassName} onClick={flipCard}>
            <div className="card-inner">
                <div className="card-front">{CARD_UNKNOWN}</div>
                <div className="card-back">{content}</div>
            </div>
        </li>
    );
}

export default Card;
