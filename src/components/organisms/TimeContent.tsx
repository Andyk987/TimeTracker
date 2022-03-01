import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { timeActions } from "../../features/time/timeSlice";
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
  const [state, setState] = useState(false);

  const { isChecking, checkingStatus } = useAppSelector((state: RootState) => state.time);
  const dispatch = useAppDispatch();

  useEffect(() => {
    chrome.storage.sync.get(['isChecking'], (res) => {
      if (res) {
        if (res.isChecking) {
          setState(true);
        } else {
          setState(false);
        }
      }
    })
  }, [])

  const handleClick = () => {
    if (!isChecking) return dispatch(timeActions.startChecking());

    return dispatch(timeActions.stopChecking());
  };

  return (
    <StyledTimeContent>
      <TimeButton type="circle" size="big" onClick={handleClick}>
        <Button tag="div">
          {/* <Span>{checkingStatus}</Span> */}
          <Span>{state ? "Stop" : "Check"}</Span>
        </Button>
      </TimeButton>
    </StyledTimeContent>
  );
};

export default memo(TimeContent);
