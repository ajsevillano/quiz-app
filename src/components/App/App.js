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
  const initialLives = 3;
  const highScore = Number(window.localStorage.getItem('highScore'));
  const [data, setData] = useState([{}]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lives, setLives] = useState(initialLives);
  const [startScreen, setStartScreen] = useState(true);

  useEffect(() => {
    highScore.length === 0
      ? window.localStorage.setItem('highScore', 0)
      : score > highScore && window.localStorage.setItem('highScore', score);
  });

  //Update the score and the lives
  function updateScoreAndLives(answer) {
    answer === data[0].correct_answer
      ? setScore(score + 10)
      : setLives(lives - 1);
    fetchQuestion(setData, setAnswers);
  }

  //When game is over it will reset all the states
  const resetGame = () => {
    setLives(3);
    setScore(0);
    setData([{}]);
    setAnswers([]);
    setStartScreen(false);
    fetchQuestion(setData, setAnswers);
  };

  return startScreen ? (
    <MenuScreen>
      <h3>Welcome to Quiz Game!</h3>
      <h5>Choose dificulty </h5>
      <Button buttonText="Start" handleClick={resetGame} color="purple" />
    </MenuScreen>
  ) : lives < 0 ? (
    //If lives go under 0, show the game over screen
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
        <Button buttonText="Play again" handleClick={resetGame} color="green" />
      </div>
    </MenuScreen>
  ) : (
    <Game
      score={score}
      setScore={setScore}
      initialLives={initialLives}
      lives={lives}
      setLives={setLives}
      data={data}
      answers={answers}
      updateScoreAndLives={updateScoreAndLives}
      setData={setData}
      setAnswers={setAnswers}
    />
  );
}

export default App;
