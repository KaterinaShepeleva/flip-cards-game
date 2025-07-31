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
    openModal: () => set(() => ({ isModalOpen: true })),
    closeModal: () => set(() => ({ isModalOpen: false })),
    
    currentCardsCount: CARDS_COUNT_DEFAULT,
    setCurrentCardsCount: (currentCardsCount) => set(() => ({ currentCardsCount })),
    
    cardTimeout: CARD_TIMEOUT_DEFAULT,
    setCardTimeout: (cardTimeout) => set(() => ({ cardTimeout })),
});

const createCardStore = (set) => ({
    cards: [],
    setCards: (cards) => set(() => ({ cards })),
    generateAllCards: () => set((state) => ({ cards: generateGameField(state.currentCardsCount) })),
    
    openedCardsPair: [null, null], // stores two cards that were already flipped
    setOpenedCards: (openedCardsPair) => set(() => ({ openedCardsPair })),
    clearOpenedCardsPair: () => set(() => ({ openedCardsPair: [null, null] })),
    
    movesCount: 0,
    incrementMovesCount: () => set((state) => ({ movesCount: state.movesCount + 1 })),
    clearMovesCount: () => set(() => ({ movesCount: 0 })),
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
                
                return () => state.generateAllCards();
            }
        },
    ),
);
