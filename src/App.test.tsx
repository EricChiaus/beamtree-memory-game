import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import useGame from './hooks/useGame';
import { CARDS_NUMBER } from './constants';
import { FlippableCard } from './types';

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

jest.mock('./hooks/useGame', () => jest.fn());
const mockUseGame = useGame as jest.Mock;

const restartSpy = jest.fn();

describe('<App />', () => {
    it('should match the snapshot', () => {
        mockUseGame.mockReset().mockReturnValue({
            items: generateCards(),
            isDisabled: false,
            hasCompleted: false,
            restart: jest.fn(),
            flip: jest.fn(),
            getItem: jest.fn(),
        });
        const { container } = render(<App />);
        expect(container).toMatchSnapshot();
    });

    describe('when game is completed', () => {
        it('should render congrats text', () => {
            mockUseGame.mockReset().mockReturnValue({
                items: generateCards(),
                isDisabled: false,
                hasCompleted: true,
                restart: jest.fn(),
                flip: jest.fn(),
                getItem: jest.fn(),
            });
            render(<App />);
            expect(
                screen.getByText('Congrats you did it!'),
            ).toBeInTheDocument();
        });
    });

    describe('when clicks restart button', () => {
        it('should invoke restart event', () => {
            mockUseGame.mockReset().mockReturnValue({
                items: generateCards(),
                isDisabled: false,
                hasCompleted: true,
                restart: restartSpy,
                flip: jest.fn(),
                getItem: jest.fn(),
            });
            render(<App />);
            const button = screen.getByRole('button', { name: 'Restart' });
            expect(button).toBeInTheDocument();
            fireEvent.click(button);
            expect(restartSpy).toBeCalledTimes(1);
        });
    });
});
