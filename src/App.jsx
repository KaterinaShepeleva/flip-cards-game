import { CARD_ANIMATION_DURATION, CARD_FLIP_TIMEOUT } from './constants.js';
import { useCardStore } from '/src/store.js';

import GameField from './components/GameField/GameField.jsx';
import RestartButton from './components/RestartButton/RestartButton.jsx';
import StartNewGameButton from './components/StartNewGameButton/StartNewGameButton.jsx';
import './App.css';
import SettingsButton from './components/SettingsButton/SettingsButton.jsx';

// timeout for closing of flipped cards
let flipCardTimeoutId = null;

function App() {
    const cards = useCardStore((state) => state.cards);
    const setCards = useCardStore((state) => state.setCards);
    const regenerateAllCards = useCardStore((state) => state.startNewGame);
    const setOpenedCards = useCardStore((state) => state.setOpenedCards);
    
    const openCard = (currentCardPos) => {
        const cardsUpdated = [...cards];
        // we need correct value immediately after store update
        let openedCards = [...useCardStore.getState().openedCardsPair];
        
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
            clearTimeout(flipCardTimeoutId);
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
            if (cards[currentCardPos].content === cards[openedCards[0]].content) {
                // leave both cards open if content of the flipped cards is equal
                cardsUpdated[currentCardPos].stayOpen = true;
                cardsUpdated[openedCards[0]].stayOpen = true;
                
                openedCards = [null, null];
            } else {
                // else close both cards on timeout
                openedCards[1] = currentCardPos;
                
                flipCardTimeoutId = setTimeout(closeUnmatchingCards, CARD_FLIP_TIMEOUT);
            }
        }
        
        setOpenedCards(openedCards);
        setCards(cardsUpdated);
    };
    
    const closeUnmatchingCards = () => {
        const cardsUpdated = [...cards];
        // get value immediately after store update
        const openedCards = useCardStore.getState().openedCardsPair;
        
        openedCards.forEach((position) => {
            if (position != null) {
                cardsUpdated[position].flipped = false;
            }
        });
        
        setOpenedCards([null, null]);
        setCards(cardsUpdated);
    };
    
    const startNewGame = (restartOnly) => {
        // close all opened cards first
        if (flipCardTimeoutId != null) {
            clearTimeout(flipCardTimeoutId);
            setOpenedCards([null, null]);
        }
        
        setCards(cards.map((card) => ({
            ...card,
            flipped: false,
            stayOpen: false,
        })));
        
        // TODO: можно сделать анимацию, когда в начале новой игры
        //  карточки переворачиваются последовательно слева направо
        
        // replace the initial card data if starting new game
        if (!restartOnly) {
            setTimeout(regenerateAllCards, CARD_ANIMATION_DURATION);
        }
    };
    
    const openSettings = () => {
        // display modal
    };
    
    return (
        <div className="game-container">
            <GameField openCard={openCard}/>
            
            <div className="actions">
                <RestartButton restart={() => startNewGame(true)}/>
                <StartNewGameButton startNewGame={() => startNewGame(false)}/>
                <SettingsButton openSettings={openSettings}/>
            </div>
        </div>
    );
}

export default App;
