import { useState, useEffect } from 'react';
import './App.css';
import Card from '../Card/';
import Questions from '../Questions';
import TimerBar from '../Timerbar';
import Button from '../Button';

function App() {
  const [data, setData] = useState([{}]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    if (lives === 0) {
      setScore(0);
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
      ? setScore(score + 1)
      : setLives(lives - 1);
  }

  function restartGame() {
    setLives(3);
    setScore(0);
    setData([{}]);
  }

  if (lives === 0) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GAME OVER</h1>
          <Button handleClick={restartGame} />
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="score">
          <h1>Score: {score}</h1>
          <div className="livesContainer">
            <h1>Lives </h1>
            {[...Array(lives)].map((stars, index) => (
              <img key={index} src="./star.png" alt="Star" />
            ))}
          </div>
        </div>

        <TimerBar
          score={score}
          setScore={setScore}
          lives={lives}
          setLives={setLives}
        />
        <header className="App-header">
          <Questions question={data[0].question} />
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
}

export default App;
