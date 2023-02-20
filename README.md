# Memory Game

## Package

A Typescript package about a memory game.

### Game rules

-   There are 16 cards on the board with 8 pairs. Cards with same number on the front sides belong to one pair.
-   All cards are initially flipped to the back side.
-   Cards can be flip to the front side or the back side.
-   Click to flip 2 cards to their front side on the board.
-   When a card has been flipped to the front side, try to remember the number on the card.
-   Flip 2 cards in a row with same number to permanently lock their front sides.
-   If flip 2 cards in a row with different number, they will be automatically flipped to the back side.
-   Flip all the cards to the front sides to win.
-   Click the restart button to start a new game any time.
-   Every time the game starts with a random order.

## Scripts

### npm start

Run `npm start` to start a server on `http://localhost:3000`.

### npm test

Run `npm test` to run all test suites.

### npm run test-coverage

Run `npm run test-coverage` to run all unit tests and display the test coverage.

### npm build

Run `npm build` to build the package.

## Design

### UI Components

-   App component: A Wrapper of the board, the restart button and the congrats text.
-   Board component: The board where contains all the cards.
-   Card component: The card with a number.

### Abstract

-   Flippable: A wrapper to create a flippable component.

### Customer hook

-   useGame: Main game logic.

### React Context

-   GameContext: Providing game states and callback functions.

## CSS

Using styled components to style the component in a CSS-in-JS way.

## Unit Tests

100% coverage Jest style tests with snapshot tests.
