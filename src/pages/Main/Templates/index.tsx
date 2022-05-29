import React from 'react';
import styled from 'styled-components';
import TimerButtons from '../../../components/molecules/TimerButtons';
import Header from '../../../components/organisms/Header';
import TimeCardsBox from '../../../components/organisms/TimeCardsBox';
import Timer from '../../../components/organisms/Timer';
import TimerController from '../../../components/organisms/TimerController';

const StyledTemplate = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 315px;
  width: 315px;
  height: 100%:
`;

const Template = () => {
  return (
    <StyledTemplate>
      <Header />
      <Timer />
      <TimerController />
      <TimeCardsBox />
    </StyledTemplate>
  );
};

export default Template;
