import React from 'react';
import { FlippableCard, Game } from '../types';

const GameContext = React.createContext<Game<FlippableCard>>({
    items: [],
    isDisabled: false,
    hasCompleted: false,
    restart: () => null,
    flip: () => null,
    getItem: () => null,
});

export default GameContext;
