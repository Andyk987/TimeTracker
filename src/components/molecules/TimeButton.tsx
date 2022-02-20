import classNames from "classnames";
import React, { memo } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Div from "../atoms/Div";

interface TimeButtonProps {
  children?: React.ReactNode;
  type?: "square" | "circle";
  size?: "small" | "normal" | "big";
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;
}

const StyledTimeButton = styled.div<TimeButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-content: string;
  border: 1px solid black;
  cursor: pointer;
  user-select: none;
  border-radius: 0;

  &.small {
    width: 50px;
    height: 50px;
  }

  &.normal {
    width: 60px;
    height: 60px;
    font-size: 13px;
  }

  &.big {
    width: 6rem;
    height: 6rem;
  }

  &.circle {
    border-radius: 50%;
  }
`;

const TimeButton = ({
  children,
  type = "square",
  size = "normal",
  onClick
}: TimeButtonProps) => {
  const defaultProps = {
    type,
    size,
  };

  return (
    <StyledTimeButton
      {...defaultProps}
      className={classNames(type, size)}
      onClick={onClick}
    >
      {children}
    </StyledTimeButton>
  );
};

export default memo(TimeButton);
