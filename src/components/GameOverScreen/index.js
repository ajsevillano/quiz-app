import Button from '../Button';
import './GameOverScreen.css';
import { useEffect, useState } from 'react';

const GameOverScreen = ({ setLives, setScore, setData, score }) => {
  const [animation, setAnimation] = useState(false);
  //Handle restart the Game
  const restartGame = () => {
    setLives(3);
    setScore(0);
    setData([{}]);
  };

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <div className="gameover-container">
      <header className="gameover-container-header">
        <div
          className={
            animation ? 'gameOverScreen fade-in' : 'gameOverScreen hidden'
          }
        >
          <h1>GAME OVER</h1>
          <h5>Score: {score} </h5>
          <h5>High Score: --- </h5>
          <Button handleClick={restartGame} />
        </div>
      </header>
    </div>
  );
};

export default GameOverScreen;
