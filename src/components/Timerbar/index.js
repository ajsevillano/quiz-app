import { useState, useEffect } from 'react';
import './Timerbar.css';

const TimerBar = ({ score }) => {
  const timeInSeconds = 10;
  const [time, setTime] = useState(timeInSeconds);
  const [barWidth, setbarWidth] = useState(100);

  //Update the timer bar every second
  useEffect(() => {
    const timer =
      time > 0
        ? setTimeout(() => {
            setTime(time - 1);
            setbarWidth(barWidth - getWidth());
          }, 1000)
        : null;
    return () => clearTimeout(timer);
  });

  //Reset the timer when the score is updated
  useEffect(() => {
    setbarWidth(100);
    setTime(timeInSeconds);
  }, [score]);

  //Calculate the width of timer bar.
  const getWidth = () => {
    return 100 / timeInSeconds;
  };

  return (
    <div
      style={{ width: barWidth < 0 ? '0%' : barWidth + '%' }}
      className="timer-bar"
    ></div>
  );
};

export default TimerBar;
