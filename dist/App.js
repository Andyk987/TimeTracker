import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MainPage from './pages/Main';
import Record from './pages/Record/index';
const AppStyled = styled.div `
  max-width: 375px;
  max-height: 600px;
  width: 375px;
  height: 600px;
`;
const App = () => {
    const [state] = useState(true);
    const testRoute1 = (React.createElement(Routes, null,
        React.createElement(Route, { path: "/popup.html", element: React.createElement(MainPage, null) })));
    const testRoute2 = (React.createElement(Routes, null,
        React.createElement(Route, { path: "/popup.html", element: React.createElement(Record, null) })));
    return (React.createElement(AppStyled, null,
        React.createElement(BrowserRouter, null, state ? testRoute1 : testRoute2)));
};
export default App;
//# sourceMappingURL=App.js.map