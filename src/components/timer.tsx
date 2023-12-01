import moment from 'moment';
import { FC, useCallback, useEffect, useState } from 'react';

type TimerType = {
  endTime: Date;
};

const Timer: FC<TimerType> = ({ endTime }) => {
  const calculateTimeLeft = useCallback(() => {
    const end_time = new Date(moment(endTime).format());
    const difference = end_time.getTime() - new Date().getTime();

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.abs(
      Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    );
    const seconds = Math.abs(Math.floor((difference % (1000 * 60)) / 1000));
    return {
      hour: hours.toString().padStart(2, '0'),
      min: minutes.toString().padStart(2, '0'),
      sec: seconds.toString().padStart(2, '0'),
    };
  }, [endTime]);

  const [time, setTime] = useState(calculateTimeLeft);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [calculateTimeLeft, endTime]);

  return (
    <>
      <div
        className={`flex items-center justify-center  ${
          Number(time?.min) > 10
            ? 'text-green'
            : Number(time?.hour) < 0
            ? 'text-red heart-text'
            : 'text-yellow'
        }`}
      >
        <p className={`${time == null && 'finished'}`}>{time?.hour || '00'}</p>:
        <p className={`${time == null && 'finished'}`}>{time?.min || '00'}</p>:
        <p className={` ${time == null && 'finished'}`}>{time?.sec || '00'}</p>
      </div>
    </>
  );
};

export default Timer;
