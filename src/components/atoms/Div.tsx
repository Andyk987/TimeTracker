import React, { memo } from "react";
import styled from "styled-components";

interface DivProps {
  children?: React.ReactNode;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const StyledDiv = styled.div<DivProps>`
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width}l;
  height: ${(props) => props.height};
  border: none;
  background-color: ${(props) => props.bgColor};
`;

const Div = ({ children, width = "auto", height = "auto" }: DivProps) => {
  const defaultprops = {
    width,
    height,
  };

  return <StyledDiv {...defaultprops}>{children}</StyledDiv>;
};

export default memo(Div);
