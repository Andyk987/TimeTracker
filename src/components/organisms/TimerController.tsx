import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import {
  START_CHECKING,
  START_CHECKING_SUCCESS,
  STOP_CHECKING,
} from '../../constants/timeConstants';
import { ButtonState, timeActions } from '../../features/time/timeSlice';
import useChromeMessage from '../../hooks/useChromeMessage';
import TimerButtons from '../molecules/TimerButtons';

const StyledTimerController = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin: 56px 0;
  width: 315px;
  max-width: 315px;
`;

const TimerController = () => {
  const [buttonState, setButtonState] = useState<ButtonState>();
  const [msg, sendMessage] = useChromeMessage('timer', 1000);

  const currentIndex = useSelector(
    (state: RootState) => state.time.currentIndex
  );

  const isChecking = useSelector(
    (state: RootState) => state.time.timeTrackerData[currentIndex]?.isChecking
  );

  const url = useAppSelector(
    (state: RootState) => state.time.timeTrackerData[currentIndex]?.url
  );

  useEffect(() => {
    setButtonState(isChecking ? 'Stop' : 'Check');
  }, [isChecking]);

  useEffect(() => {
    if (!msg) return;
    if (msg.code.includes('ERROR')) return alert('Error');
    // sendMessage({ code: msg?.prevCode, url: msg.url });
    return () => {};
  }, [msg]);

  const handleTimer = useCallback(() => {
    const msg = isChecking ? STOP_CHECKING : START_CHECKING;
    setButtonState(() => 'Loading');
    sendMessage({ code: msg, data: { timeTrackerData: { url } } });
  }, [isChecking]);

  const handleResest = () => {};

  return (
    <StyledTimerController>
      <TimerButtons
        url={url}
        isChecking={isChecking}
        buttonState={buttonState}
        handleTimer={handleTimer}
        handleReset={handleResest}
      />
    </StyledTimerController>
  );
};

export default memo(TimerController);
