import './Card.css';

const Card = ({ index, answers, handler }) => {
  const letters = ['A', 'B', 'C', 'D'];
  const colors = ['purple', 'green', 'blue', 'dark-blue'];

  return (
    <div className="card" onClick={handler}>
      <h2 className={`answer-letter ${colors[index]}`}>{letters[index]}</h2>
      <p>{answers}</p>
    </div>
  );
};

export default Card;
