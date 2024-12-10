import { useEffect } from 'react';
import 'phaser';
import { GameConfig } from '../game/config';

function App() {
    useEffect(() => {
        // Create new game instance
        const game = new Phaser.Game(GameConfig);
        
        // Cleanup on unmount
        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div id="phaser-game" style={{
            width: '800px',
            height: '600px',
            margin: 'auto',
            marginTop: '20px'
        }}></div>
    );
}

export default App;
