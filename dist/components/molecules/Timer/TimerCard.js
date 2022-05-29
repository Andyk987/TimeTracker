import React, { memo } from 'react';
import styled from 'styled-components';
const StyledTimerCard = styled.div `
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
  font-family: ${(props) => props.theme.font.nunito};
  font-style: normal;
`;
const Time = styled.div `
  ${({ theme }) => theme.common.flexCenter};
  width: 60px;
  height: 50px;
  background: white;
  border-radius: 5px;
  font-weight: 400;
  font-size: 20px;
  color: ${(props) => props.theme.colors.dimgray};
  box-shadow: -5px 12px 12px rgba(0, 0, 0, 0.25);
`;
const TimeInfo = styled.span `
  margin-top: 6px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  font-size: 14px;
`;
const TimerCard = ({ timerData }) => {
    return (React.createElement(StyledTimerCard, null,
        React.createElement(Time, null, timerData.value),
        React.createElement(TimeInfo, null, timerData.info)));
};
export default memo(TimerCard);
//# sourceMappingURL=TimerCard.js.map