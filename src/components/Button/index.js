import './Button.css';

const Button = ({ buttonText, handleClick, color }) => {
  return (
    <button className={`button button-${color}`} onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default Button;
