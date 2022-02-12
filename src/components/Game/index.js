//Components
import Card from '../Card/';
import Questions from '../Questions';
import TimerBar from '../Timerbar';

export const Game = ({
  score,
  setScore,
  initialLives,
  lives,
  setLives,
  data,
  answers,
  updateScoreAndLives,
  setData,
  setAnswers,
  righAnswer,
  correcto,
}) => {
  //Fix HTML characters
  function sanitizeQuestion() {
    return data[0].question
      ?.replace(/&amp;/g, '&')
      .replace(/&quot;/g, `'`)
      .replace(/&eacute;/g, `é`)
      .replace(/&#039;/g, `'`);
  }
  return (
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
        setData={setData}
        setAnswers={setAnswers}
      />
      <header className="App-header">
        <Questions question={sanitizeQuestion()} />
        <div className="card-container">
          {answers.map((answer, index) => {
            return (
              <Card
                handler={() => updateScoreAndLives(answer)}
                index={index}
                key={index}
                answers={answer}
                righAnswer={righAnswer}
                correcto={correcto}
              />
            );
          })}
        </div>
      </header>
    </div>
  );
};
