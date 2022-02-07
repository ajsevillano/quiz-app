import './Button.css';

const Button = ({ buttonText, handleClick }) => {
  return (
    <button className="button" onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default Button;
