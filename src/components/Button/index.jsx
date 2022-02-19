import './Button.css';
import PropTypes from 'prop-types';

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

Button.propTypes = {
  buttonText: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  buttonText: 'button',
  color: 'purple',
};

export default Button;
