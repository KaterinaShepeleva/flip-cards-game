import { CARD_ANIMATION_DURATION } from '/src/constants.js';
import { useStore } from '/src/store.js';

import './App.css';
import GameField from '/src/components/GameField/GameField.jsx';
import RestartButton from '/src/components/RestartButton/RestartButton.jsx';
import MovesCount from '/src/components/MovesCount/MovesCount.jsx';
import StartNewGameButton from '/src/components/StartNewGameButton/StartNewGameButton.jsx';
import SettingsButton from '/src/components/SettingsButton/SettingsButton.jsx';
import SettingsModal from '/src/components/SettingsModal/SettingsModal.jsx';

// timeout for closing of flipped cards
window.flipCardTimeoutId = null;

function App() {
    const cards = useStore((state) => state.cards);
    const setCards = useStore((state) => state.setCards);
    const generateAllCards = useStore((state) => state.generateAllCards);
    
    const clearOpenedCardsPair = useStore((state) => state.clearOpenedCardsPair);
    const clearMovesCount = useStore((state) => state.clearMovesCount);
    
    const startNewGame = (restartOnly) => {
        if (window.flipCardTimeoutId != null) {
            clearTimeout(window.flipCardTimeoutId);
        }
        
        // close all cards first
        setCards(cards.map((card) => ({
            ...card,
            flipped: false,
            stayOpen: false,
        })));
        
        clearOpenedCardsPair();
        clearMovesCount();
        
        // replace the initial card data if starting new game
        if (!restartOnly) {
            setTimeout(generateAllCards, CARD_ANIMATION_DURATION);
        }
    };
    
    return (
        <div className="game-container">
            <h1>Flip Cards Game</h1>
            
            <GameField/>
            
            <div className="actions">
                <MovesCount/>
                <RestartButton restart={() => startNewGame(true)}/>
                <StartNewGameButton startNewGame={() => startNewGame(false)}/>
                <SettingsButton/>
            </div>
            
            <SettingsModal/>
        </div>
    );
}

export default App;
