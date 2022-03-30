import React from 'react';
import { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = {
  date: new Date(),
  secondDeg: (date) => date.getSeconds() * 6,
  minuteDeg: (date: Date) => date.getMinutes() * 6,
  hourDeg: (date: Date) =>
    (date.getHours() / 12) * 360 + (date.getMinutes() / 60) * 30,
};

const rotateSecond = keyframes`
  from {
    transform: translate(-50%, -50%) rotateZ(${
      rotate.secondDeg(rotate.date) - 90
    }deg);
  } to  {
    transform: translate(-50%, -50%) rotateZ(${
      rotate.secondDeg(rotate.date) + 360 - 90
    }deg);
  }
`;

const rotateMinute = keyframes`
  from {
    transform: translate(-50%, -50%) rotateZ(${
      rotate.minuteDeg(rotate.date) - 90
    }deg);
  } to  {
    transform: translate(-50%, -50%) rotateZ(${
      rotate.minuteDeg(rotate.date) + 360 - 90
    }deg);
  }
`;

const rotateHour = keyframes`
  from {
    transform: translate(-50%, -50%) rotateZ(${
      rotate.hourDeg(rotate.date) - 90
    }deg);
  } to  {
    transform: translate(-50%, -50%) rotateZ(${
      rotate.hourDeg(rotate.date) + 360 - 90
    }deg);
  }
`;

const StyledClock = styled.div`
  position: relative;
  display: flex;
  margin: 2rem 0;
  width: 170px;
  height: 170px;
  border: none;
  border-radius: 50%;
  background: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const TimeWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Dial = styled.div``;

const Indicator = styled.div`
  position: absolute;
  width: 2px;
  height: 4px;
  background: #565656;
  border-radius: 22px;

  &:nth-child(1) {
    ${/* top */ ''}
    left: 50%;
    top: 4%;
    transform: translate(-50%, -50%);
  }
  &:nth-child(2) {
    ${/* right */ ''}
    left: 96%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
  }
  &:nth-child(3) {
    ${/* bottom */ ''}
    left: 50%;
    top: 96%;
    transform: translate(-50%, -50%);
  }
  &:nth-child(4) {
    ${/* left */ ''}
    left: 4%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

const TimeCenter = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #895cf2;
  z-index: 1;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
`;

const Hour = styled.div`
  position: absolute;
  top: 50%;
  left: 95px;
  transform-origin: 10px;
  width: 40px;
  height: 2px;
  background: ${(props) => props.theme.colors.dimgray};
  border-radius: 1px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.2);
  animation: ${rotateHour} 43200s linear infinite;
`;

const Minute = styled.div`
  position: absolute;
  top: 50%;
  left: 105px;
  transform-origin: 10px;
  width: 60px;
  height: 2px;
  background: ${(props) => props.theme.colors.dimgray};
  border-radius: 1px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.2);
  animation: ${rotateMinute} 3600s linear infinite;
`;

const Seconds = styled.div`
  position: absolute;
  top: 50%;
  left: 115px;
  width: 80px;
  height: 2px;
  transform-origin: 10px;
  background: ${(props) => props.theme.colors.violet};
  border-radius: 1px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.2);
  animation: ${rotateSecond} 60s linear infinite;
`;

const clock = () => {
  return (
    <StyledClock>
      <TimeWrapper>
        <Dial>
          <Indicator />
          <Indicator />
          <Indicator />
          <Indicator />
        </Dial>
        <TimeCenter />
        <Hour />
        <Minute />
        <Seconds />
      </TimeWrapper>
    </StyledClock>
  );
};

export default memo(clock);
