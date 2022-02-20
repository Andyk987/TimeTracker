import React from "react";
import styled from "styled-components";
import Header from "../../../components/organisms/Header";
import TimeContent from "../../../components/organisms/TimeContent";

const StyledTemplate = styled.div`
    display: flex;
    flex-flow: column;
    flex-grow: 1;
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
