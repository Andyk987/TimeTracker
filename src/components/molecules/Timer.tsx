import React, { memo } from 'react';
import styled from 'styled-components';
import Div from '../atoms/Div';

const StyledTimer = styled.div`
  ${({ theme }) => theme.common.flexCenter};
`;

const TimerNumber = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  color: ${(props) => props.theme.colors.dimgray};
  font-family: ${(props) => props.theme.font.nunito};
  font-style: normal;
  font-size: 40px;
`;

const Timer = () => {
  return (
    <StyledTimer>
      <TimerNumber>00 :&nbsp;</TimerNumber>
      <TimerNumber>00 :&nbsp;</TimerNumber>
      <TimerNumber>00 :&nbsp;</TimerNumber>
      <TimerNumber>00</TimerNumber>
    </StyledTimer>
  );
};

export default memo(Timer);
