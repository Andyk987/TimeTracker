import React, { memo } from "react";
import styled from "styled-components";

interface ButtonProps {
  children?: React.ReactNode;
  tag?: "button" | "div";
  color?: string;
  bgColor?: string;
  border?: string;
  flex?: number | "auto";
  url?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void; // only in button tag
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDiv = styled.div<ButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Button = ({
  children,
  tag = "button",
  flex = "auto",
  color = "black",
  onClick
}: ButtonProps) => {
  const buttonTag = <StyledButton onClick={onClick}>{children}</StyledButton>;

  const divTag = <StyledDiv onClick={onClick}>{children}</StyledDiv>;

  return tag === "button" ? buttonTag : divTag;
};

export default memo(Button);
