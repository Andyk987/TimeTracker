import React, { memo, useEffect } from "react";
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
  const { checking } = useAppSelector((state: RootState) => state.time);
  const dispatch = useAppDispatch();
  
  const handleClick = () => {
    dispatch(timeActions.startChecking());
  };
  
  return (
    <StyledTimeContent>
      <TimeButton type="circle" size="big" onClick={handleClick}>
        <Button tag="div">
          <Span>{checking ? "stop" : "check"}</Span>
        </Button>
      </TimeButton>
    </StyledTimeContent>
  );
};

export default memo(TimeContent);
