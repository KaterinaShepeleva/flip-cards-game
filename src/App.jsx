import { useState } from 'react';
import { CARD_ANIMATION_DURATION, CARD_FLIP_TIMEOUT } from './constants.js';
import { generateGameField } from './utilities.js';

import GameField from './components/GameField/GameField.jsx';
import RestartButton from './components/RestartButton/RestartButton.jsx';
import StartNewGameButton from './components/StartNewGameButton/StartNewGameButton.jsx';
import './App.css';
import SettingsButton from './components/SettingsButton/SettingsButton.jsx';

const GAME_FIELD_LENGTH = 8;
const initialGameField = generateGameField(GAME_FIELD_LENGTH);

// stores two cards that were already flipped
let openedCardsPair = [null, null];
// timeout for closing of flipped cards
let flipCardTimeoutId = null;

function App() {
    const [field, setField] = useState([...initialGameField]);
    
    const openCard = (currentCardPos) => {
        if (
            field[currentCardPos].stayOpen
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
        
        field[currentCardPos].flipped = true;
        
        if (openedCardsPair[0] == null) {
            // if the first card of pair should be open
            openedCardsPair[0] = currentCardPos;
        } else {
            // if needed to flip the second card from of a pair
            if (field[currentCardPos].content === field[openedCardsPair[0]].content) {
                // leave both cards open if content of the flipped cards is equal
                field[currentCardPos].stayOpen = true;
                field[openedCardsPair[0]].stayOpen = true;
                
                openedCardsPair[0] = null;
                openedCardsPair[1] = null;
            } else {
                // else close both cards on timeout
                openedCardsPair[1] = currentCardPos;
                flipCardTimeoutId = setTimeout(closeUnmatchingCards, CARD_FLIP_TIMEOUT);
            }
        }
        
        setField([...field]);
    };
    
    const closeUnmatchingCards = () => {
        openedCardsPair.forEach((position) => {
            if (position != null) {
                field[position].flipped = false;
            }
        });
        
        openedCardsPair = [null, null];
        setField([...field]);
    };
    
    const startNewGame = (restartOnly) => {
        // close all opened cards first
        if (flipCardTimeoutId != null) {
            clearTimeout(flipCardTimeoutId);
            openedCardsPair = [null, null];
        }
        
        setField(field.map((card) => ({
            ...card,
            flipped: false,
            stayOpen: false,
        })));
        
        // TODO: Слава предложил сделать анимацию, когда в начале новой игры
        //  карточки переворачиваются последовательно слева направо
        // replace the initial card data if starting new game
        if (!restartOnly) {
            setTimeout(() => {
                setField(generateGameField(GAME_FIELD_LENGTH));
            }, CARD_ANIMATION_DURATION);
        }
    };
    
    const openSettings = () => {
        // display modal
    };
    
    return (
        <div className="game-container">
            <GameField field={field} openCard={openCard}/>
            
            <div className="actions">
                <RestartButton restart={() => startNewGame(true)}/>
                <StartNewGameButton startNewGame={() => startNewGame(false)}/>
                <SettingsButton openSettings={openSettings}/>
            </div>
        </div>
    );
}

export default App;
