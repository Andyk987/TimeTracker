import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { GET_TIME } from "../../constants/timeConstants";
import { timeActions, TimeState } from "../../features/time/timeSlice";
import Button from "../atoms/Button";
import Span from "../atoms/Span";
import TimeButton from "../molecules/TimeButton";

const StyledTimeContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: silver;
`;

const TimeContent = () => {
  const [state, setState] = useState<TimeState>({
    checkingStatus: "Check",
    isChecking: false,
  });

  const { isChecking, checkingStatus, time } = useAppSelector(
    (state: RootState) => state.time
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(timeActions.getInitState());
  }, []);

  const handleClick = () => {
    if (!isChecking) return dispatch(timeActions.startChecking());

    return dispatch(timeActions.stopChecking());
  };

  const handleClick2 = async () => {
    await chrome.runtime.sendMessage({ code: GET_TIME }, async (res) => {
      await dispatch(timeActions.getTime(res.code))
    })
  };

  return (
    <StyledTimeContent>
      <TimeButton type="circle" size="big" onClick={handleClick}>
        <Button tag="div">
          <Span>{checkingStatus}</Span>
        </Button>
      </TimeButton>
      <Span>{time}</Span>
      {/* <Button onClick={handleClick2}>Click</Button> */}
    </StyledTimeContent>
  );
};

export default memo(TimeContent);
