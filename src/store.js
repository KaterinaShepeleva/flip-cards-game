import { create } from 'zustand';
import { generateGameField } from './utilities.js';
import { CARDS_COUNT_DEFAULT } from './constants.js';

const createSettingsStore = (set) => ({
    isModalOpen: false,
    setModalOpen: (isModalOpen) => set(() => ({ isModalOpen })),
    currentCardsCount: CARDS_COUNT_DEFAULT,
    setCurrentCardsCount: (currentCardsCount) => set(() => ({ currentCardsCount })),
});

const createCardStore = (set) => ({
    cards: generateGameField(CARDS_COUNT_DEFAULT),
    setCards: (cards) => set(() => ({ cards })),
    openedCardsPair: [null, null], // stores two cards that were already flipped
    setOpenedCards: (openedCardsPair) => set(() => ({ openedCardsPair })),
    startNewGame: () => set((state) => ({ cards: generateGameField(state.currentCardsCount) })),
});

export const useStore = create((...a) => ({
    ...createCardStore(...a),
    ...createSettingsStore(...a),
}));
