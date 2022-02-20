import React, { memo } from "react";
import styled from "styled-components";

interface SpanProps {
  children?: React.ReactNode;
  width?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const StyledSpan = styled.span<SpanProps>`
  display: block;
  width: ${(props: SpanProps) => props.width};
`;

const Span = ({ children, width = "auto" }: SpanProps) => {
  const defaultProps = {
    width,
  };

  return <StyledSpan {...defaultProps}>{children}</StyledSpan>;
};

export default memo(Span);
