import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import Card from '.';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(),
}));
const mockUseContext = useContext as jest.Mock;

jest.mock('./index.style', () => ({
    CardWrapper: ({ children }) => {
        return <div>{children}</div>;
    },
}));

describe('<Card />', () => {
    it('should return null given no item found', () => {
        mockUseContext.mockReset().mockReturnValue({
            getItem: () => null,
        });
        const { container } = render(<Card index={0} />);
        expect(container).toMatchInlineSnapshot(`<div />`);
    });

    it('should match the snapshot given valid item', () => {
        mockUseContext.mockReset().mockReturnValue({
            getItem: index => ({
                index: index,
                content: index.toString(),
                isFlippable: true,
                isFlipped: true,
            }),
        });
        const { container } = render(<Card index={0} />);
        expect(container).toMatchSnapshot();
    });
});
