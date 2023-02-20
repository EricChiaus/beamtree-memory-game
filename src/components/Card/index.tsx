import React, { useContext, useMemo } from 'react';
import GameContext from './../../contexts/GameContext';
import { CardWrapper } from './index.style';

interface CardProps {
    index: number;
}

const Card: React.FC<CardProps> = ({ index }) => {
    const { getItem } = useContext(GameContext);

    const item = useMemo<ReturnType<typeof getItem>>(
        () => getItem(index),
        [index, getItem],
    );

    if (!item) {
        return null;
    }

    return <CardWrapper>{item.content}</CardWrapper>;
};

export default Card;
