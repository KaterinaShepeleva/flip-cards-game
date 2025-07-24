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
    
    let openedCardsPair = useCardStore((state) => state.openedCardsPair);
    const setOpenedCards = useCardStore((state) => state.setOpenedCards);
    
    const openCard = (currentCardPos) => {
        console.log('currentCardPos', currentCardPos);
        const cardsUpdated = [...cards];
        
        if (
            cards[currentCardPos].stayOpen
            // if clicked on the same card that was previously opened
            || currentCardPos === openedCardsPair[0]
        ) {
            return;
        }
        
        // if clicked on the third card while other two were open
        if (
            openedCardsPair[0] != null
            && openedCardsPair[1] != null
            && !openedCardsPair.includes(currentCardPos)
        ) {
            // close the previous two cards
            clearTimeout(flipCardTimeoutId);
            closeUnmatchingCards();
            
            // open the card that was clicked
            openCard(currentCardPos);
            return;
        }
        
        cardsUpdated[currentCardPos].flipped = true;
        
        if (openedCardsPair[0] == null) {
            // if the first card of pair should be open
            openedCardsPair[0] = currentCardPos;
        } else {
            // if needed to flip the second card of a pair
            if (cards[currentCardPos].content === cards[openedCardsPair[0]].content) {
                // leave both cards open if content of the flipped cards is equal
                cardsUpdated[currentCardPos].stayOpen = true;
                cardsUpdated[openedCardsPair[0]].stayOpen = true;
                
                openedCardsPair = [null, null];
            } else {
                // else close both cards on timeout
                openedCardsPair[1] = currentCardPos;
                flipCardTimeoutId = setTimeout(closeUnmatchingCards, CARD_FLIP_TIMEOUT);
            }
        }
        
        setOpenedCards(openedCardsPair);
        setCards(cardsUpdated);
    };
    
    const closeUnmatchingCards = () => {
        const cardsUpdated = [...cards];
        
        openedCardsPair.forEach((position) => {
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
