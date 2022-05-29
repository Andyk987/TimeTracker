import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../app/store';
import useTimer from '../../hooks/useTimer';
import { secondsToTime } from '../../modules/timerUtil';
import TimerCard from '../molecules/Timer/TimerCard';

export type TimerData = {
  info: 'H' | 'M' | 'S';
  value: string;
};

const StyledTimer = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  padding: 20px 0;
  margin-top: 30px;
  width: 315px;
  background: ${(props) => props.theme.gradientColors.gradientPurple};
  background-size: 300% 300%;
  border-radius: 5px;
  gap: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const Timer = () => {
  const currentIndex = useSelector(
    (state: RootState) => state.time.currentIndex
  );

  const timeRecord = useSelector(
    (state: RootState) => state.time.timeTrackerData[currentIndex]?.timeRecord
  );

  const [time] = useTimer(timeRecord);

  const { hour, minute, seconds } = secondsToTime(time);

  const timerList: TimerData[] = [
    { info: 'H', value: hour.toString().padStart(2, '0') || '00' },
    { info: 'M', value: minute.toString().padStart(2, '0') || '00' },
    { info: 'S', value: seconds.toString().padStart(2, '0') || '00' },
  ];

  const result = timerList.map((v, i) => {
    return (
      <TimerCard
        key={i}
        timerData={{
          info: v.info,
          value: v.value,
        }}
      />
    );
  });

  return <StyledTimer>{result}</StyledTimer>;
};

export default memo(Timer);
