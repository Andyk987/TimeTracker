import React from "react";
import { memo } from "react";
import styled from "styled-components";
import Span from "../atoms/Span";

interface TitleProps {
  children?: React.ReactNode;
}

// used google font
const StyledTitle = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-family: "Palanquin", sans-serif;
  font-size: 20px;
  letter-spacing: 1px;
`;

const Title = ({ children }: TitleProps) => {
  return (
    <StyledTitle>
      {children}
    </StyledTitle>
  );
};

export default memo(Title);
