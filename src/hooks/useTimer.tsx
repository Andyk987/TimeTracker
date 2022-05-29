import { useEffect, useRef, useState } from 'react';
import { TimeRecord } from '../common/types';
import { END_TIME } from '../constants/timeConstants';
import { addTime } from '../modules/timerUtil';

const useTimer = (record: TimeRecord[] = []) => {
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (record.length === 0) {
      setTimer(false);
      return setTime(0);
    }
    const time = addTime(record);
    setTime(time);

    if (!Object(record[record.length - 1]).hasOwnProperty(END_TIME))
      setTimer(true);
    else setTimer(false);

    return () => {
      console.log('cleaned t');
    };
  }, [record]);

  useEffect(() => {
    if (timer) {
      console.log('timer');
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      console.log('timer cleared');
      if (timerRef?.current) clearInterval(timerRef.current);
    };
  }, [timer]);

  return [time];
};

export default useTimer;
