import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Flippable from '.';

jest.mock('./index.style', () => ({
    FlippableWrapper: props => (
        <button onClick={props.onClick} data-testid={props['data-testid']}>
            {props.isFlipped}
            {props.children}
        </button>
    ),
}));

const onFlipSpy = jest.fn();

describe('<Flippable />', () => {
    it('should match the snapshot', () => {
        const { container } = render(
            <Flippable dataTestId="test-id" isFlipped={true} onFlip={onFlipSpy}>
                Children
            </Flippable>,
        );

        expect(container).toMatchSnapshot();
    });

    it('should render a button with data-testid = test-id', () => {
        render(
            <Flippable dataTestId="test-id" isFlipped={true} onFlip={onFlipSpy}>
                Children
            </Flippable>,
        );

        const button = screen.getByTestId('test-id');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(onFlipSpy).toBeCalledTimes(1);
    });
});
