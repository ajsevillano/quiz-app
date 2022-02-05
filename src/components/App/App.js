import { useState, useEffect } from 'react';
import './App.css';
import Card from '../Card/';
import Questions from '../Questions';

function App() {
  const [data, setData] = useState([{}]);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
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
      const answersArrayFlatted = [
        response.results[0].correct_answer,
        response.results[0].incorrect_answers,
      ].flat();
      const answersArray = shuffle(answersArrayFlatted);
      setAnswers(answersArray);
    }
    fetchUsers();
  }, [score]);

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
  function answer1(answer) {
    if (answer === data[0].correct_answer) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
  }

  function checkCorrectAnswer(answer) {
    answer === data[0].correct_answer
      ? setScore(score + 1)
      : setScore(score - 1);
  }

  return (
    <div className="App">
      <h1 className="score">Score: {score}</h1>
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

export default App;
