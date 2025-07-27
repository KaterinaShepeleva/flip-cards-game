import { useStore } from '/src/store.js';

import './GameField.css';
import Card from '/src/components/Card/Card.jsx';

function GameField(props) {
    const { openCard } = props;
    const cards = useStore((state) => state.cards);
    
    const cardItems = cards.map((card) =>
        <Card
            key={card.position}
            position={card.position}
            content={card.content}
            flipped={card.flipped}
            onCardClick={openCard}
        />
    );
    
    return (
        <div className="game-field">
            <div className="cards-list">{cardItems}</div>
        </div>
    );
}

export default GameField;
