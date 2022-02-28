import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import MainPage from "./pages/Main";
import Record from "./pages/Record/index";

const AppStyled = styled.div`
  max-width: 375px;
  max-height: 600px;
  width: 375px;
  height: 600px;
`;

const App = () => {
  const [state] = useState(true);
  
  const testRoute1 = (
    <Routes>
      <Route path="/popup.html" element={<MainPage />} />
    </Routes>
  );

  const testRoute2 = (
    <Routes>
      <Route path="/popup.html" element={<Record />} />
    </Routes>
  );

  return (
    <AppStyled>
      <BrowserRouter>
        {state ? testRoute1 : testRoute2}
      </BrowserRouter>
    </AppStyled>
  );
};

export default App;
