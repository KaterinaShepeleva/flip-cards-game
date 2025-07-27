import { useState } from 'react';
import Modal from 'react-modal';

import './SettingsModal.css';
import { CARDS_COUNT_MAX, CARDS_COUNT_MIN } from '/src/constants.js';
import { useStore } from '/src/store.js';
import closeIcon from '/src/assets/close-icon.svg';

Modal.setAppElement('#root');

function SettingsModal(props) {
    const { isOpen, closeModal, onAfterClose } = props;
    const [cardsCount, setCardsCount] = useState(useStore((state) => state.currentCardsCount));
    
    const setRangeCount = (event) => {
        if (event.target.value === cardsCount) {
            return;
        }
        
        setCardsCount(event.target.value);
    };
    
    // TODO: add ModalHeader component
    // TODO: add timeout setting as radio buttons or range (preferably), or texfield for number
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            onAfterClose={() => onAfterClose(cardsCount)}
            shouldCloseOnOverlayClick={false}
            overlayClassName="settings-modal-overlay"
            className="settings-modal"
            id="settings"
        >
            <div className="settings-modal-header">
                <h2 className="heading">Settings</h2>
                <button
                    type="button"
                    className="btn close"
                    onClick={closeModal}
                >
                    <img
                        className="icon"
                        src={closeIcon}
                        alt="Close Modal"
                        draggable="false"
                    />
                </button>
            </div>
            
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
            </div>
        </Modal>
    );
}

export default SettingsModal;
