import { CARD_UNKNOWN } from '/src/constants.js';
import './Card.css';

function Card(props) {
    const { position, content, flipped, onCardClick } = props;
    const cardClassName = ['card', flipped ? 'flipped' : ''].join(' ');
    const flipCard = () => {
        onCardClick(position);
    };
    
    return (
        <li className={cardClassName} onClick={flipCard}>
            <div className="card-inner">
                <div className="card-front">
                    <span>{CARD_UNKNOWN}</span>
                </div>
                <div className="card-back">
                    <span>{content}</span>
                </div>
            </div>
        </li>
    );
}

export default Card;
