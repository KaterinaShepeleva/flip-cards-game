# Flip Cards Game

A simple card-matching game where the goal is to find pairs of identical cards. Player flips two cards at a time and try to remember their positions. If the cards match, they stay open; if not, they close after a short delay, and player needs to try again until there are no closed cards remaining on the field.

**Features**

- Adaptive layout (mobile, tablet, desktop);
- Card set is randomly generated for each game cycle;
- Game keeps track of how many pairs of cards have been flipped;
- User can customize the number of cards on the field (from 6 to 24) to adjust difficulty;
- User can set the delay before unmatched cards close, allowing for easier or more challenging gameplay;
- Applied settings are saved in `localStorage` and persist after refreshing the page.

**Actions**

- Restart Game: closes all open cards without changing its content;
- Start New Game: generates a new set of cards in a random order;
- Settings: player can select the preferred difficulty level.

You can try the game here: [click](https://katerinashepeleva.github.io/flip-cards/)

## Project stack

- HTML, CSS
- JavaScript
- React v.19.1.0
- Zustand v.5.0.6 for state management