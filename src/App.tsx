import React from 'react';
import { Button, Container } from './App.styles';
import GameContext from './contexts/GameContext';
import useGame from './hooks/useGame';
import Board from './components/Board';

const App: React.FC = () => {
    const game = useGame();

    return (
        <GameContext.Provider value={game}>
            <Container>
                <Board />
                <Button onClick={game.restart}>Restart</Button>
            </Container>
        </GameContext.Provider>
    );
};

export default App;
