import React, { useEffect } from 'react';
import { memo } from 'react';
import styled from 'styled-components';
import { ButtonState, TimeState } from '../../features/time/timeSlice';
import Button from '../atoms/Button';
import Loading from './Loading';

interface TimerButtonsProps {
  children?: React.ReactNode;
  url?: string;
  isChecking: boolean;
  buttonState?: ButtonState;
  handleTimer?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void;
  handleReset?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void;
}

const StyledTimerButtons = styled.div<TimerButtonsProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isChecking ? 'space-between' : 'center'};
  width: 100%;
  transition: all 0.3s cubic-bezier(0.59, 0.46, 0.46, 0.85);

  pointer-events: ${(props) => (props.url ? 'all' : 'none')};
  opacity: ${(props) => (props.url ? '1' : '0.5')};
`;

const TimerButton = styled(Button)`
  font-family: ${(props) => props.theme.font.sarabun};
  font-weight: 600;
  border-radius: 5px;
`;

const TimerButtons: React.FC<TimerButtonsProps> = ({
  url,
  isChecking,
  buttonState,
  handleTimer,
  handleReset,
}) => {
  return (
    <StyledTimerButtons isChecking={isChecking} url={url}>
      <TimerButton buttonStyle="Full" onClick={handleTimer}>
        {buttonState === 'Loading' ? (
          <Loading viewBox="0 0 120 40" cx="60" cy="20" borderColor="white" />
        ) : (
          buttonState
        )}
      </TimerButton>
      {isChecking ? (
        <TimerButton buttonStyle="Border" onClick={handleReset}>
          Reset
        </TimerButton>
      ) : null}
    </StyledTimerButtons>
  );
};

export default memo(TimerButtons);
