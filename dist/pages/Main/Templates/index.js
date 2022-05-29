import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/organisms/Header';
import TimeContent from '../../../components/organisms/TimeContent';
const StyledTemplate = styled.div `
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Template = () => {
    return (React.createElement(StyledTemplate, null,
        React.createElement(Header, null),
        React.createElement(TimeContent, null)));
};
export default Template;
//# sourceMappingURL=index.js.map