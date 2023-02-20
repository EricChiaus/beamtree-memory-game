import React, { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FlippableCard } from '../../types';
import { CARDS_NUMBER } from '../../constants';
import Board from '.';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(),
}));
const mockUseContext = useContext as jest.Mock;

jest.mock('./index.style', () => ({
    BoardWrapper: ({ children }) => <div>{children}</div>,
}));

jest.mock('../Flippable', () => ({ dataTestId, isFlipped, onFlip }) => (
    <button data-testid={dataTestId} onClick={onFlip}>
        {isFlipped}
    </button>
));

const generateCards = (): FlippableCard[] => {
    const cards: FlippableCard[] = [];
    for (let i = 0; i < CARDS_NUMBER; i++) {
        cards.push({
            index: i,
            content: Math.floor(i / 2).toString(),
            isFlippable: true,
            isFlipped: true,
        });
    }
    return cards;
};

const flipSpy = jest.fn();

describe('<Board />', () => {
    beforeEach(() => {
        mockUseContext.mockReset().mockReturnValue({
            items: generateCards(),
            flip: flipSpy,
        });
    });

    it('should match the snapshot', () => {
        const { container } = render(<Board />);
        expect(container).toMatchSnapshot();
    });

    it('should invoke onFlip event on Flippable components', () => {
        render(<Board />);
        fireEvent.click(screen.getByTestId('flippable-card-0'));
        expect(flipSpy).toBeCalledWith(0);
    });
});
