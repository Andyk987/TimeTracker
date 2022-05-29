import React from 'react';
import { memo } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
const StyledTimerButtons = styled.div `
  position: relative;
  width: 100%;
  height: 140px;
  ${({ theme }) => theme.common.flexCenter};
`;
const TimerButton = styled(Button) `
  ${({ theme }) => theme.common.flexCenter};
  width: 120px;
  height: 40px;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.violet};
  color: white;
  font-family: ${(props) => props.theme.font.sarabun};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.05rem;
  text-align: center;
  cursor: pointer;
`;
const TimerButtons = ({ buttonState, onClick, }) => {
    return (React.createElement(StyledTimerButtons, null,
        React.createElement(TimerButton, { tag: "div", onClick: onClick }, buttonState)));
};
export default memo(TimerButtons);
//# sourceMappingURL=TimerButtons.js.map