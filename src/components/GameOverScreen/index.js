import Button from '../Button';
import './GameOverScreen.css';

const GameOverScreen = ({ setLives, setScore, setData, score }) => {
  //Handle restart the Game
  const restartGame = () => {
    setLives(3);
    setScore(0);
    setData([{}]);
  };

  return (
    <div className="gameover-container">
      <header className="gameover-container-header">
        <div className="gameOverScreen">
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
