import React, { useContext } from 'react';
import { BoardWrapper } from './index.style';
import GameContext from './../../contexts/GameContext';
import Flippable from '../Flippable';
import Card from '../Card';

const Board: React.FC = () => {
    const { items, flip } = useContext(GameContext);

    return (
        <BoardWrapper>
            {items.map(item => (
                <Flippable
                    key={item.index}
                    isFlipped={item.isFlipped}
                    flip={() => flip(item.index)}>
                    <Card index={item.index} />
                </Flippable>
            ))}
        </BoardWrapper>
    );
};

export default Board;
