import LoadingIcon from '../../assets/loading-icon.svg';
import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  viewBox?: string;
  cx?: string;
  cy?: string;
  borderColor?: string;
}

const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const dash = keyframes`
    0% {
        stroke-dasharray: 40, 30;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 20, 40;
        stroke-dashoffset: -20;
    }
    100% {
        stroke-dasharray: 40, 30;
        stroke-dashoffset: -70;
    }
`;

const color = (props: LoadingProps) => keyframes`
    0% {
        stroke: ${props.borderColor};
    }
    40% {
        stroke: ${props.borderColor};
    }
    66% {
        stroke: ${props.borderColor};
    }
    80%, 90% {
        stroke: ${props.borderColor};
    }
`;

const StyledLoading = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Loader = styled(LoadingIcon)<LoadingProps>`
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${rotate} 2s linear infinite;
  transform-origin: center center;

  & circle:nth-child(1) {
    cx: ${(props) => props.cx};
    cy: ${(props) => props.cy};
    r: 8;
    stroke: ${(props) => props.borderColor};
    stroke-width: 2;
    stroke-dasharray: 150, 200;
    stroke-dashoffset: -10;
    animation: ${dash} 1.5s ease-in-out infinite,
      ${(props) => color({ borderColor: props.borderColor })} 6s ease-in-out
        infinite;
    stroke-linecap: round;
  }
`;

const Loading: React.FC<LoadingProps> = ({
  viewBox,
  cx,
  cy,
  borderColor = 'red',
}) => {
  return (
    <StyledLoading>
      <Loader viewBox={viewBox} cx={cx} cy={cy} borderColor={borderColor} />
    </StyledLoading>
  );
};

export default memo(Loading);
