import { FlippableCard } from '../types';
import { flipCard, generateCards } from './cards';

let cards: FlippableCard[] = [];

describe('generateCards method', () => {
    beforeEach(() => {
        cards = generateCards();
    });

    it('should generate 16 cards', () => {
        expect(cards.length).toBe(16);
    });
    it('should generate cards with 16 unique indexes', () => {
        expect(new Set(cards.map(card => card.index)).size).toBe(16);
    });
    it('should generate cards with 8 different contents', () => {
        expect(new Set(cards.map(card => card.content)).size).toBe(8);
    });
    it('should generate cards with isFlippable = true', () => {
        expect(cards.every(card => card.isFlippable)).toBe(true);
    });
    it('should generate cards with isFlipped = true', () => {
        expect(cards.every(card => card.isFlipped)).toBe(true);
    });
});

describe('flipCard method', () => {
    it('should flip a card', () => {
        expect(
            flipCard({
                index: 5,
                content: '6',
                isFlippable: true,
                isFlipped: false,
            }),
        ).toEqual({
            index: 5,
            content: '6',
            isFlippable: true,
            isFlipped: true,
        });
    });

    describe('if the card has already been flipped', () => {
        it('should not flip a card', () => {
            expect(
                flipCard({
                    index: 5,
                    content: '6',
                    isFlippable: false,
                    isFlipped: false,
                }),
            ).toEqual({
                index: 5,
                content: '6',
                isFlippable: false,
                isFlipped: false,
            });
        });
    });
});
