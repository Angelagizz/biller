import React from 'react';
import { useTimer } from 'react-timer-hook';

export default function Timer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });



  return (
    <div>
      <div>
        <span>{minutes}</span>min <span>{seconds}s</span>
      </div>
    </div>
  );
}
