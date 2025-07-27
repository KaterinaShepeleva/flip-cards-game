import { CARD_ANIMATION_DURATION, CARD_FLIP_TIMEOUT } from './constants.js';
import { useStore } from '/src/store.js';

import './App.css';
import GameField from './components/GameField/GameField.jsx';
import RestartButton from './components/RestartButton/RestartButton.jsx';
import StartNewGameButton from './components/StartNewGameButton/StartNewGameButton.jsx';
import SettingsButton from './components/SettingsButton/SettingsButton.jsx';
import SettingsModal from './components/SettingsModal/SettingsModal.jsx';

// timeout for closing of flipped cards
let flipCardTimeoutId = null;

function App() {
    const cards = useStore((state) => state.cards);
    const setCards = useStore((state) => state.setCards);
    const regenerateAllCards = useStore((state) => state.startNewGame);
    const setOpenedCards = useStore((state) => state.setOpenedCards);
    
    const isModalOpen = useStore((state) => state.isModalOpen);
    const setModalOpen = useStore((state) => state.setModalOpen);
    
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
        const openedCards = useStore.getState().openedCardsPair;
        
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
        
        // replace the initial card data if starting new game
        if (!restartOnly) {
            setTimeout(regenerateAllCards, CARD_ANIMATION_DURATION);
        }
    };
    
    const openSettings = () => {
        setModalOpen(true);
    };
    
    const closeSettings = () => {
        setModalOpen(false);
    }
    
    return (
        <div className="game-container">
            <h1>Flip Cards Game</h1>
            
            <GameField openCard={openCard}/>
            
            <div className="actions">
                <RestartButton restart={() => startNewGame(true)}/>
                <StartNewGameButton startNewGame={() => startNewGame(false)}/>
                <SettingsButton openSettings={openSettings}/>
            </div>
            
            <SettingsModal
                isOpen={isModalOpen}
                onClose={closeSettings}
            />
        </div>
    );
}

export default App;
