import { useState } from 'react';
//Styles
import './App.css';

import Button from '../Button';
import { Game } from '../Game';
import MenuScreen from '../MenuScreen';

function App() {
  const initialLives = 3;
  const [data, setData] = useState([{}]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lives, setLives] = useState(initialLives);
  const [startScreen, setStartScreen] = useState(true);

  async function fetchQuestion() {
    const fetchResponse = await fetch(
      'https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple',
      {
        method: 'GET',
      }
    );
    //Store the response.
    const response = await fetchResponse.json();
    setData(response.results);

    //Store the answers
    const answersArrayFlatted = flatAnswerArray(
      response.results[0].correct_answer,
      response.results[0].incorrect_answers
    );
    const answersArray = shuffle(answersArrayFlatted);
    setAnswers(answersArray);
  }

  //Flat the answer Array
  function flatAnswerArray(rightAnswer, wrongAnswers) {
    return [rightAnswer, wrongAnswers].flat();
  }

  //Shuffle the answersArray
  function shuffle(answers) {
    var j, x, i;
    for (i = answers.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = answers[i];
      answers[i] = answers[j];
      answers[j] = x;
    }
    return answers;
  }

  //Update the score and the lives
  function updateScoreAndLives(answer) {
    answer === data[0].correct_answer
      ? setScore(score + 10)
      : setLives(lives - 1);
    fetchQuestion();
  }

  const restartGame = () => {
    setLives(3);
    setScore(0);
    setData([{}]);
    setStartScreen(false);
    fetchQuestion();
  };

  return startScreen ? (
    <MenuScreen>
      <h3>Welcome to Quiz Game!</h3>
      <h5>Choose dificulty </h5>
      <Button handleClick={restartGame} />
    </MenuScreen>
  ) : lives < 0 ? (
    //If lives go under 0, show the game over screen
    <MenuScreen>
      <h1>GAME OVER</h1>
      <h5>Score: {score} </h5>
      <h5>High Score: --- </h5>
      <Button handleClick={restartGame} />
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
    />
  );
}

export default App;
