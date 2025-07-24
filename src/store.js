import { create } from 'zustand';
import { generateGameField } from './utilities.js';

const GAME_FIELD_LENGTH = 8;

export const useCardStore = create((set) => ({
    cards: generateGameField(GAME_FIELD_LENGTH),
    setCards: (cards) => set(cards),
    openedCardsPair: [null, null], // stores two cards that were already flipped
    setOpenedCards: (newValue) => set(newValue),
    startNewGame: () => set(generateGameField(GAME_FIELD_LENGTH)),
}));
