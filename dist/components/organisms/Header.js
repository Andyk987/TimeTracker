import React from 'react';
import styled from 'styled-components';
import Span from '../atoms/Span';
import Title from '../molecules/Title';
const StyledHeader = styled.div `
  ${({ theme }) => theme.common.flexCenter};
  color: ${(props) => props.theme.colors.dimgray};
  padding-top: 20px;
`;
const Header = ({ children }) => {
    return (React.createElement(StyledHeader, null,
        React.createElement(Title, null,
            React.createElement(Span, null, "Youtube Tracker"))));
};
export default Header;
//# sourceMappingURL=Header.js.map