import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { generateGameField } from './utilities.js';
import {
    CARDS_COUNT_DEFAULT,
    CARD_TIMEOUT_DEFAULT,
    LOCAL_STORAGE_KEY,
} from './constants.js';

const createSettingsStore = (set) => ({
    isModalOpen: false,
    setModalOpen: (isModalOpen) => set(() => ({ isModalOpen })),
    currentCardsCount: CARDS_COUNT_DEFAULT,
    setCurrentCardsCount: (currentCardsCount) => set(() => ({ currentCardsCount })),
    cardTimeout: CARD_TIMEOUT_DEFAULT,
    setCardTimeout: (cardTimeout) => set(() => ({ cardTimeout })),
});

const createCardStore = (set) => ({
    cards: [],
    setCards: (cards) => set(() => ({ cards })),
    openedCardsPair: [null, null], // stores two cards that were already flipped
    setOpenedCards: (openedCardsPair) => set(() => ({ openedCardsPair })),
    startNewGame: () => set((state) => ({ cards: generateGameField(state.currentCardsCount) })),
});

export const useStore = create(
    persist(
        (...a) => ({
            ...createCardStore(...a),
            ...createSettingsStore(...a),
        }),
        {
            name: LOCAL_STORAGE_KEY,
            partialize: (state) => ({
                currentCardsCount: state.currentCardsCount,
                cardTimeout: state.cardTimeout,
            }),
            onRehydrateStorage: (state, error) => {
                if (error) {
                    console.log('Hydration error', error);
                    return;
                }
                
                return () => state.startNewGame();
            }
        },
    ),
);
