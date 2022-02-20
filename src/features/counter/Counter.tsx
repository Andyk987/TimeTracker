import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/atoms/Button";
import Span from "../../components/atoms/Span";
import { decrement, increment, selectCount } from "./counterSlice";

const StyledConter = styled.div``;

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <StyledConter>
      <Span>{count}</Span>
      <Button tag="button" onClick={() => dispatch(increment())}>
        Increment
      </Button>
      <Button tag="button" onClick={() => dispatch(decrement())}>
        Decrement
      </Button>
    </StyledConter>
  );
};

export default Counter;
