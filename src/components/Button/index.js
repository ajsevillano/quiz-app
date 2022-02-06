import './Button.css';

const Button = ({ handleClick }) => {
  return (
    <button className="button" onClick={handleClick}>
      Play again?
    </button>
  );
};

export default Button;
