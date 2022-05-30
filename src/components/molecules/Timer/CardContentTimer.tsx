import React, { memo } from 'react';
import styled from 'styled-components';
import { TimeRecord } from '../../../common/types';
import useTimer from '../../../hooks/useTimer';
import { secondsToTime } from '../../../modules/timerUtil';

interface CardContentTimerProps {
  record?: TimeRecord[];
}

const StyledCardContentTimer = styled.div`
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 100%;
  animation: all 1s ease-in-out;
`;

const CardContentTimer: React.FC<CardContentTimerProps> = ({ record }) => {
  const [time] = useTimer(record);
  const { hour, minute, seconds } = secondsToTime(time);

  return (
    <StyledCardContentTimer>{`${hour}h ${minute}m ${seconds}s`}</StyledCardContentTimer>
  );
};

export default memo(CardContentTimer);
