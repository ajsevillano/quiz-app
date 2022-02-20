import './Button.css';

/**
 * Primary UI component for user interaction
 */
const Button = ({ buttonText, handleClick, color }) => {
  return (
    <button className={`button button-${color}`} onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default Button;
