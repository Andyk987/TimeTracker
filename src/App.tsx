import * as React from "react";
import styled from "styled-components";

const AppStyled = styled.div`
  width: 375px;
  height: 600px;
`;

const App = () => {
  return (
    <AppStyled>
      <button>button</button>
    </AppStyled>
  );
};

export default App;
