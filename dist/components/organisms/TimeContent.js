var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { START_CHECKING, STOP_CHECKING } from '../../constants/timeConstants';
import { timeActions } from '../../features/time/timeSlice';
import TimeCardBox from '../molecules/TimeCardBox';
import Timer from '../molecules/Timer/Timer';
import TimerButtons from '../molecules/TimerButtons';
const StyledTimeContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.5rem 0;
  max-width: 315px;
  width: 315px;
  height: 100%;
`;
const TopLayer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  color: ${(props) => props.theme.colors.dimgray};
  font-family: ${(props) => props.theme.font.nunito};
  font-size: 16px;
  font-weight: 600;
`;
const CardCounter = styled.div`
  letter-spacing: 0.3rem;
`;
const TimeContent = () => {
    const { time, buttonState, isChecking } = useAppSelector((state) => state.time);
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(timeActions.getInitState({ isChecking }));
    }, []);
    const handleClick = () => __awaiter(void 0, void 0, void 0, function* () {
        let msg;
        let action;
        if (buttonState === 'Check') {
            msg = START_CHECKING;
            action = timeActions.startCheckingSuccess();
            dispatch(timeActions.startChecking());
        }
        else {
            msg = STOP_CHECKING;
            action = timeActions.stopCheckingSuccess();
            dispatch(timeActions.stopChecking());
        }
        yield chrome.runtime.sendMessage({ code: msg, url: 'https://www.youtube.com/' }, (res) => {
            if (!res.code.includes('SUCCESS'))
                throw Error('x');
            setTimeout(() => {
                dispatch(action);
            }, 1000);
        });
    });
    return (React.createElement(StyledTimeContent, null,
        React.createElement(Timer, { time: time }),
        React.createElement(TimerButtons, { buttonState: buttonState, onClick: handleClick }),
        React.createElement(TimeCardBox, null)));
};
export default memo(TimeContent);
//# sourceMappingURL=TimeContent.js.map