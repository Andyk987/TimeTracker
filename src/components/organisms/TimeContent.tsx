import React, { memo } from 'react';
import styled from 'styled-components';
import Clock from '../molecules/Clock';
import Timer from '../molecules/Timer';
import TimerButton from '../molecules/TimerButton';

const StyledTimeContent = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
  width: 100%;
  padding: 4rem 0;
`;

const TimeContent = () => {
  return (
    <StyledTimeContent>
      <Timer />
      <Clock />
      <TimerButton>Check</TimerButton>
    </StyledTimeContent>
  );
};

export default memo(TimeContent);
