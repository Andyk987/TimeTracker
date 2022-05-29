import React from 'react';
import { memo } from 'react';
import styled from 'styled-components';
import Span from '../atoms/Span';

interface TitleProps {
  children?: React.ReactNode;
}

// used google font
const StyledTitle = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Sarabun', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 21px;
`;

const Title = ({ children }: TitleProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default memo(Title);
