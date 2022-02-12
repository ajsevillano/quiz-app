import './Card.css';

const Card = ({ index, answers, handler, righAnswer, correcto }) => {
  const letters = ['A', 'B', 'C', 'D'];
  const colors = ['purple', 'green', 'blue', 'dark-blue'];

  return (
    <div
      className={`card ${correcto && righAnswer === answers && 'realgreen'}`}
      onClick={handler}
    >
      <h2 className={`answer-letter ${colors[index]}`}>{letters[index]}</h2>
      <p>{answers}</p>
    </div>
  );
};

export default Card;
