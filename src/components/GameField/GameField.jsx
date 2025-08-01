import { useStore } from '/src/store.js';

import './GameField.css';
import Card from '/src/components/Card/Card.jsx';

function GameField() {
    const cards = useStore((state) => state.cards);
    const setCards = useStore((state) => state.setCards);
    
    const cardTimeout = useStore((state) => state.cardTimeout);
    const incrementMovesCount = useStore((state) => state.incrementMovesCount);
    
    const setOpenedCards = useStore((state) => state.setOpenedCards);
    const clearOpenedCardsPair = useStore((state) => state.clearOpenedCardsPair);
    
    const openCard = (currentCardPos) => {
        const cardsUpdated = [...cards];
        // we need correct value immediately after store update
        let openedCards = [...useStore.getState().openedCardsPair];
        
        if (
            cards[currentCardPos].stayOpen
            // if clicked on the same card that was previously opened
            || currentCardPos === openedCards[0]
        ) {
            return;
        }
        
        // if clicked on the third card while other two were open
        if (
            openedCards[0] != null
            && openedCards[1] != null
            && !openedCards.includes(currentCardPos)
        ) {
            // close the previous two cards
            clearTimeout(window.flipCardTimeoutId);
            closeUnmatchingCards();
            
            // open the card that was clicked
            openCard(currentCardPos);
            return;
        }
        
        cardsUpdated[currentCardPos].flipped = true;
        
        if (openedCards[0] == null) {
            // if the first card of pair should be open
            openedCards[0] = currentCardPos;
        } else {
            // if needed to flip the second card of a pair
            // count this move anyway
            incrementMovesCount();
            
            if (cards[currentCardPos].content === cards[openedCards[0]].content) {
                // leave both cards open if content of the flipped cards is equal
                cardsUpdated[currentCardPos].stayOpen = true;
                cardsUpdated[openedCards[0]].stayOpen = true;
                
                openedCards = [null, null];
            } else {
                // else close both cards on timeout
                openedCards[1] = currentCardPos;
                
                window.flipCardTimeoutId = setTimeout(closeUnmatchingCards, cardTimeout);
            }
        }
        
        setOpenedCards(openedCards);
        setCards(cardsUpdated);
    };
    
    const closeUnmatchingCards = () => {
        const cardsUpdated = [...cards];
        // get value immediately after store update
        const openedCards = useStore.getState().openedCardsPair;
        
        openedCards.forEach((position) => {
            if (position != null) {
                cardsUpdated[position].flipped = false;
            }
        });
        
        clearOpenedCardsPair();
        setCards(cardsUpdated);
    };
    
    return (
        <div className="cards-list">
            {cards.map((card) => (
                <Card
                    key={card.position}
                    position={card.position}
                    content={card.content}
                    flipped={card.flipped}
                    onCardClick={openCard}
                />
            ))}
        </div>
    );
}

export default GameField;
