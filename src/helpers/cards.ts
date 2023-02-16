import { CARDS_NUMBER } from '../constants';
import { FlippableCard } from '../types';
import shuffle from './shuffle';

const rebuildIndex = (cards: FlippableCard[]) => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].index = i;
    }
    return cards;
};

export const generateCards = (): FlippableCard[] => {
    const cards: FlippableCard[] = [];
    for (let i = 0; i < CARDS_NUMBER; i++) {
        cards.push({
            index: i,
            content: Math.floor(i / 2).toString(),
            isFlippable: true,
            isFlipped: true,
        });
    }
    return rebuildIndex(shuffle<FlippableCard>(cards));
};

export const flipCard = (card: FlippableCard): FlippableCard => {
    if (card.isFlippable) {
        card.isFlipped = !card.isFlipped;
    }
    return { ...card };
};
