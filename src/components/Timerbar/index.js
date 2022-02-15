import { useState, useEffect } from 'react';
import './Timerbar.css';
import fetchQuestion from '../../libs/fetch';

const TimerBar = ({
  score,
  setScore,
  lives,
  setLives,
  setData,
  setAnswers,
}) => {
  const timeInSeconds = 2342315;
  const [time, setTime] = useState(timeInSeconds);
  const [barWidth, setbarWidth] = useState(100);

  //Update the timer bar every second
  useEffect(() => {
    const timer =
      time >= 0
        ? setTimeout(() => {
            setTime(time - 1);
            setbarWidth(barWidth - getWidth());
          }, 1000)
        : (setLives(lives - 1),
          setbarWidth(100),
          setTime(timeInSeconds),
          fetchQuestion(setData, setAnswers));
    return () => clearTimeout(timer);
  }, [barWidth, score, setScore, time, lives, setLives, setAnswers, setData]);

  //Reset the timer when the score is updated
  useEffect(() => {
    setbarWidth(100);
    setTime(timeInSeconds);
  }, [score, lives]);

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
