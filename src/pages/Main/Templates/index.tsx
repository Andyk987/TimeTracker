import React from 'react';
import styled from 'styled-components';
import Clock from '../../../components/molecules/Clock';
import Header from '../../../components/organisms/Header';
import NavMenu from '../../../components/organisms/NavMenu';
import TimeContent from '../../../components/organisms/TimeContent';

const StyledTemplate = styled.div`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Template = () => {
  return (
    <StyledTemplate>
      <Header />
      <TimeContent />
    </StyledTemplate>
  );
};

export default Template;
