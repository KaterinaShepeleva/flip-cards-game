import { useState } from 'react';
import Modal from 'react-modal';

import './SettingsModal.css';
import {
    CARDS_COUNT_MAX,
    CARDS_COUNT_MIN,
    TIMEOUT_RADIO_NAME,
    TIMEOUT_SETTINGS,
} from '/src/constants.js';
import { useStore } from '/src/store.js';
import SettingsModalHeader from './SettingsModalHeader.jsx';

Modal.setAppElement('#root');

function SettingsModal() {
    const isModalOpen = useStore((state) => state.isModalOpen);
    const closeModal = useStore((state) => state.closeModal);
    
    const initialCardsCount = useStore((state) => state.currentCardsCount);
    const setCurrentCardsCount = useStore((state) => state.setCurrentCardsCount);
    const initialCardTimeout = useStore((state) => state.cardTimeout);
    const setCardTimeout = useStore((state) => state.setCardTimeout);
    
    const generateAllCards = useStore((state) => state.generateAllCards);
    const clearMovesCount = useStore((state) => state.clearMovesCount);
    const clearOpenedCardsPair = useStore((state) => state.clearOpenedCardsPair);
    
    const [cardsCount, setCardsCount] = useState(useStore((state) => state.currentCardsCount));
    const [timeout, setNewTimeout] = useState(initialCardTimeout);
    
    const setRangeCount = (event) => {
        if (event.target.value === cardsCount) {
            return;
        }
        
        setCardsCount(event.target.value);
    };
    
    const changeTimeout = (event) => {
        const newTimeout = Number(event.target.value);
        
        if (Number.isNaN(newTimeout)) {
            return;
        }
        
        setNewTimeout(newTimeout);
    };
    
    const applySettings = () => {
        // do nothing if settings didn't change
        if (initialCardsCount === cardsCount && timeout === initialCardTimeout) {
            closeModal();
            return;
        }
        
        // apply settings
        setCurrentCardsCount(cardsCount);
        setCardTimeout(timeout);
        
        // restart game
        clearMovesCount();
        clearOpenedCardsPair();
        generateAllCards();
        
        closeModal();
    };
    
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={applySettings}
            shouldCloseOnOverlayClick={false}
            preventScroll={true}
            overlayClassName="settings-modal-overlay"
            className="settings-modal"
            id="settings"
        >
            <SettingsModalHeader closeModal={applySettings}/>
            
            <div className="settings-modal-body">
                <div className="set-cards-range">
                    <label>
                        <span className="range-label">
                            Number of cards ({`from ${CARDS_COUNT_MIN} to ${CARDS_COUNT_MAX}`}):
                        </span>
                        <div className="range-wrap">
                            <input
                                type="range"
                                min={CARDS_COUNT_MIN}
                                max={CARDS_COUNT_MAX}
                                value={cardsCount}
                                step="2"
                                onChange={setRangeCount}
                            />
                            <span className="range-value">
                                {cardsCount}
                            </span>
                        </div>
                    </label>
                </div>
                
                <div className="set-cards-timeout">
                    <span className="timeout-label">
                        Timeout duration (delay before the pair of cards automatically closes):
                    </span>
                    <div className="timeout-radio-group">
                        {TIMEOUT_SETTINGS.map((item) => (
                            <label className="timeout-option" key={item.value}>
                                <input
                                    type="radio"
                                    name={TIMEOUT_RADIO_NAME}
                                    value={item.value}
                                    checked={timeout === item.value}
                                    onChange={changeTimeout}
                                />
                                <span className="timeout-option-label">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default SettingsModal;
