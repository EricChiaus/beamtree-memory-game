import React, { PropsWithChildren } from 'react';
import { FlippableWrapper } from './index.style';

interface FlippableProps {
    dataTestId?: string;
    isFlipped: boolean;
    onFlip: () => void;
}

const Flippable: React.FC<PropsWithChildren<FlippableProps>> = ({
    children,
    dataTestId,
    isFlipped,
    onFlip,
}) => {
    return (
        <FlippableWrapper
            data-testid={dataTestId}
            isFlipped={isFlipped}
            onClick={onFlip}>
            {children}
        </FlippableWrapper>
    );
};

export default Flippable;
