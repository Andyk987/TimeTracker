import React from "react";
import styled from "styled-components";
import MainPage from "./pages/Main";

const AppStyled = styled.div`
  max-width: 375px;
  max-height: 600px;
  width: 375px;
  height: 600px;
`;

const App = () => {
  return (
    <AppStyled>
      <MainPage />
    </AppStyled>
  );
};

export default App;
