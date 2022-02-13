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
  const [screenAnimation, setScreenAnimation] = useState(false);
  const [correctAnswer, setcorrectAnswer] = useState(false);
  //Create or Update the highscore
  useEffect(() => {
    highScore.length === 0
      ? window.localStorage.setItem('highScore', 0)
      : score > highScore && window.localStorage.setItem('highScore', score);
  });

  //Run the fade in animation on game start
  useEffect(() => {
    setScreenAnimation(true);
  }, []);

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
      setTimeout(() => {
        setScreenAnimation(true);
      }, 100);
    };

    //If lives are less than 0 load the game over screen
    lives === -1 && setStates();
  }, [gameScreens, lives]);

  const showCorrectAnswerColor = () => {
    setcorrectAnswer(true);
    setTimeout(() => {
      setcorrectAnswer(false);
      setScore(score + 10);
    }, 1000);
  };

  //Update the score and the lives
  function updateScoreAndLives(answer) {
    answer === data[0].correct_answer
      ? showCorrectAnswerColor()
      : setLives(lives - 1);

    setTimeout(() => {
      fetchQuestion(setData, setAnswers);
    }, 1000);
  }

  //When game is over it will reset all the states
  function startNewGame(option) {
    const setGameScreen = gameScreens.map((obj) => {
      return obj.name === option
        ? { ...obj, isActive: true }
        : { ...obj, isActive: false };
    });
    setLives(3);
    setData([{}]);
    setAnswers([]);
    setScore(0);
    option === 'game' ? setScreenAnimation(false) : setScreenAnimation(true);
    setGameScreens(setGameScreen);
    option === 'game' && fetchQuestion(setData, setAnswers);
  }

  //Destructure the screens
  const [mainMenu, gameover, game] = gameScreens;

  return (
    <>
      {mainMenu.isActive && (
        <MenuScreen screenAnimation={screenAnimation}>
          <img className="logo-quiz" src="logo-quiz.png" alt="Logo" />
          <h3 className="welcome-quiz">Welcome to Quiz Game!</h3>
          <h5 className="choose-difficulty">Choose dificulty </h5>
          <Button
            buttonText="Start"
            handleClick={() => startNewGame('game')}
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
          righAnswer={data[0].correct_answer}
          correctAnswer={correctAnswer}
          category={data[0].category}
        />
      )}
      {gameover.isActive && (
        <MenuScreen screenAnimation={screenAnimation}>
          <img className="trophy-icon" src="./trophy.png" alt="trophy" />
          <h5 className="high-score">High Score: {highScore} </h5>
          <h1>GAME OVER</h1>
          <p className="game-over-subtext">Well done! Don't give up!</p>
          <h5 className="score-text">
            Score: <span className="score-number"> {score}</span>
          </h5>
          <div className="menu-buttons-container">
            <Button
              buttonText="Menu"
              handleClick={() => startNewGame('menu')}
              color="purple"
            />
            <Button
              buttonText="Play again"
              handleClick={() => startNewGame('game')}
              color="green"
            />
          </div>
        </MenuScreen>
      )}
    </>
  );
}

export default App;
