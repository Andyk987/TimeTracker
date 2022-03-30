import React, { memo } from 'react';
import styled from 'styled-components';
import Span from '../atoms/Span';

const StyledTime = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #565656;
  font-family: 'Nunito', sans-serif;
  font-style: normal;
  font-size: 30px;
  line-height: 41px;
`;

const Time = () => {
  return (
    <StyledTime>
      <Span>4: 03</Span>
    </StyledTime>
  );
};

export default memo(Time);
