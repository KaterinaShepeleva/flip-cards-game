import { create } from 'zustand';
import { generateGameField } from './utilities.js';

const GAME_FIELD_LENGTH = 8;

const createCardStore = (set) => ({
    cards: generateGameField(GAME_FIELD_LENGTH),
    setCards: (cards) => set(() => ({ cards })),
    openedCardsPair: [null, null], // stores two cards that were already flipped
    setOpenedCards: (openedCardsPair) => set(() => ({ openedCardsPair })),
    startNewGame: () => set(() => ({ cards: generateGameField(GAME_FIELD_LENGTH) })),
});

const createSettingsStore = (set) => ({
    isModalOpen: false,
    setModalOpen: (isModalOpen) => set(() => ({ isModalOpen })),
});

export const useStore = create((...a) => ({
    ...createCardStore(...a),
    ...createSettingsStore(...a),
}));
