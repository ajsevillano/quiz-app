import { useState, useEffect } from 'react';
//Styles
import './App.css';
//Components
import Card from '../Card/';
import Questions from '../Questions';
import TimerBar from '../Timerbar';
import GameOverScreen from '../GameOverScreen';

function App() {
  const initialLives = 3;
  const [data, setData] = useState([{}]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lives, setLives] = useState(initialLives);

  useEffect(() => {
    if (lives < 0) {
      setAnswers([]);
      setData([{}]);
    } else {
      async function fetchUsers() {
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
      fetchUsers();
    }
  }, [score, lives]);

  console.log(data[0].question);

  //Fix HTML characters
  function sanitizeQuestion() {
    return data[0].question
      ?.replace(/&amp;/g, '&')
      .replace(/&quot;/g, `'`)
      .replace(/&#039;/g, `'`);
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

  //Check the correct answer
  function checkCorrectAnswer(answer) {
    answer === data[0].correct_answer
      ? setScore(score + 10)
      : setLives(lives - 1);
  }

  //If lives go under 0, show the game over screen
  return lives < 0 ? (
    <GameOverScreen
      setLives={setLives}
      setScore={setScore}
      setData={setData}
      score={score}
    />
  ) : (
    <div className="App">
      <div className="score">
        <h1>Score: {score}</h1>
        <div className="livesContainer">
          <h1>Lives </h1>
          {[...Array(initialLives)].map((stars, index) => {
            return lives > index ? (
              <img key={index} src="./star.png" alt="Star" />
            ) : (
              <img key={index} src="./staroff.png" alt="Star" />
            );
          })}
        </div>
      </div>

      <TimerBar
        score={score}
        setScore={setScore}
        lives={lives}
        setLives={setLives}
      />
      <header className="App-header">
        <Questions question={sanitizeQuestion()} />
        <div className="card-container">
          {answers.map((answer, index) => {
            return (
              <Card
                handler={() => checkCorrectAnswer(answer)}
                index={index}
                key={index}
                answers={answer}
              />
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
