import './Questions.css';

function Questions({ category, question }) {
  return (
    <div className="question-container">
      <h3 className="question">{question}</h3>
      <p className="category">{category}</p>
    </div>
  );
}

export default Questions;
