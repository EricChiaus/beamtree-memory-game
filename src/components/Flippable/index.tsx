import React, { PropsWithChildren } from 'react';
import { FlippableWrapper } from './index.style';

interface FlippableProps {
    isFlipped: boolean;
    flip: () => void;
}

const Flippable: React.FC<PropsWithChildren<FlippableProps>> = ({
    children,
    isFlipped,
    flip,
}) => {
    return (
        <FlippableWrapper isFlipped={isFlipped} onClick={flip}>
            {children}
        </FlippableWrapper>
    );
};

export default Flippable;
