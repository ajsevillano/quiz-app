import { useState, useEffect } from 'react';
//Styles
import './App.css';
//Components
import Button from '../Button';
import { Game } from '../Game';
import MenuScreen from '../MenuScreen';
//Libs
import fetchQuestion from '../../libs/fetch.js';

function App() {
  const initialStates = {
    initialLives: 3,
    initialScore: 0,
    initialScreens: [
      { name: 'menu', isActive: true },
      { name: 'game-over', isActive: false },
      { name: 'game', isActive: false },
    ],
  };

  const highScore = Number(window.localStorage.getItem('highScore'));
  const [data, setData] = useState([{}]);
  const [score, setScore] = useState(initialStates.initialScore);
  const [answers, setAnswers] = useState([]);
  const [lives, setLives] = useState(initialStates.initialLives);
  const [gameScreens, setGameScreens] = useState(initialStates.initialScreens);

  //Create or Update the highscore
  useEffect(() => {
    highScore.length === 0
      ? window.localStorage.setItem('highScore', 0)
      : score > highScore && window.localStorage.setItem('highScore', score);
  });

  //Check if the game is over
  useEffect(() => {
    const setStates = () => {
      const setGameOverScreen = gameScreens.map((obj) => {
        return obj.name === 'game-over'
          ? { ...obj, isActive: true }
          : { ...obj, isActive: false };
      });
      setLives(0);
      setGameScreens(setGameOverScreen);
    };

    //If lives are less than 0 load the game over screen
    lives === -1 && setStates();
  }, [gameScreens, lives]);

  //Update the score and the lives
  function updateScoreAndLives(answer) {
    answer === data[0].correct_answer
      ? setScore(score + 10)
      : setLives(lives - 1);
    fetchQuestion(setData, setAnswers);
  }

  //When game is over it will reset all the states
  const resetGame = () => {
    const setGameScreen = gameScreens.map((obj) => {
      return obj.name === 'game'
        ? { ...obj, isActive: true }
        : { ...obj, isActive: false };
    });
    setLives(3);
    setData([{}]);
    setAnswers([]);
    setGameScreens(setGameScreen);
    fetchQuestion(setData, setAnswers);
  };

  //Destructure the screens
  const [mainMenu, gameover, game] = gameScreens;

  return (
    <>
      {mainMenu.isActive && (
        <MenuScreen>
          <img className="logo-quiz" src="logo-quiz.png" alt="Logo" />
          <h3 className="welcome-quiz">Welcome to Quiz Game!</h3>
          <h5 className="choose-difficulty">Choose dificulty </h5>
          <Button
            buttonText="Start"
            handleClick={() => resetGame()}
            color="purple"
          />
        </MenuScreen>
      )}
      {game.isActive && (
        <Game
          score={score}
          setScore={setScore}
          initialLives={initialStates.initialLives}
          lives={lives}
          setLives={setLives}
          data={data}
          answers={answers}
          updateScoreAndLives={updateScoreAndLives}
          setData={setData}
          setAnswers={setAnswers}
        />
      )}
      {gameover.isActive && (
        <MenuScreen>
          <img className="trophy-icon" src="./trophy.png" alt="trophy" />
          <h5 className="high-score">High Score: {highScore} </h5>
          <h1>GAME OVER</h1>
          <p className="game-over-subtext">Well done! Don't give up!</p>
          <h5 className="score-text">
            Score: <span className="score-number"> {score}</span>
          </h5>
          <div className="menu-buttons-container">
            <Button buttonText="Menu" handleClick={resetGame} color="purple" />
            <Button
              buttonText="Play again"
              handleClick={resetGame}
              color="green"
            />
          </div>
        </MenuScreen>
      )}
    </>
  );
}

export default App;
