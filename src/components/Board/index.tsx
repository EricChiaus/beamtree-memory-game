import React, { useCallback, useContext } from 'react';
import { BoardWrapper } from './index.style';
import GameContext from './../../contexts/GameContext';
import Flippable from '../Flippable';
import Card from '../Card';
import { FlippableCard } from '../../types';

const Board: React.FC = () => {
    const { items, flip } = useContext(GameContext);

    const onFlip = useCallback(
        (item: FlippableCard) => () => {
            flip(item.index);
        },
        [flip],
    );

    return (
        <BoardWrapper>
            {items.map(item => (
                <Flippable
                    key={item.index}
                    dataTestId={`flippable-card-${item.index}`}
                    isFlipped={item.isFlipped}
                    onFlip={onFlip(item)}>
                    <Card index={item.index} />
                </Flippable>
            ))}
        </BoardWrapper>
    );
};

export default Board;
