import { CARD_CONTENT_SET } from './constants.js';

// rearranges array elements in random order
// mutates the original array!
export function shuffle(array) {
    let currentIndex = array.length;
    
    while (currentIndex !== 0) {
        // Pick a remaining element
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        
        // And swap it with the current element
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

export function generateGameField(fieldLength) {
    const possibleOptions = [...CARD_CONTENT_SET];
    
    // we need random order of cards every time we generate the game field
    shuffle(possibleOptions);
    
    // cards are displayed in pairs, so we need twice fewer options for its content
    const cardsOptionsUnique = possibleOptions.slice(0, Math.floor(fieldLength / 2));
    
    // duplicate every option we got in randomized array
    const cardsContent = [...cardsOptionsUnique, ...cardsOptionsUnique];
    // and shuffle the cards
    shuffle(cardsContent);
    
    return cardsContent.map((content, position) => ({
        position,
        content,
        flipped: false,
        stayOpen: false,
    }));
}
