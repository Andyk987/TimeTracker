import TimerIcon from '../../assets/timer-icon.svg';
import React, { memo } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

interface TimerButtonProps {
  children?: React.ReactNode;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void;
}

const StyledTimerButton = styled(Button)`
  ${({ theme }) => theme.common.flexCenter};
  width: 170px;
  height: 40px;
  background: ${(props) => props.theme.gradientColors.gradientPurple};
  background-size: 300%, 300%;
  border-radius: 22px;
  color: white;
  gap: 5px;
  font-family: ${(props) => props.theme.font.sarabun};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.05em;
  cursor: pointer;
`;

const TimerButton: React.FC<TimerButtonProps> = ({ children, onClick }) => {
  return (
    <StyledTimerButton as="div" onClick={onClick}>
      <TimerIcon fill="white" />
      {children}
    </StyledTimerButton>
  );
};

export default memo(TimerButton);
