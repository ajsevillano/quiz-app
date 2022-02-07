import { useEffect, useState } from 'react';
import Button from '../Button';

export const StartScreen = ({ restartGame }) => {
  console.log(restartGame);
  const [animation, setAnimation] = useState(false);
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
          <h3>Welcome to Quiz Game!</h3>
          <h5>Choose dificulty </h5>
          <Button handleClick={restartGame} />
        </div>
      </header>
    </div>
  );
};
