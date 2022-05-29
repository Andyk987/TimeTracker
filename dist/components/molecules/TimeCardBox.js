import React, { memo } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import Button from '../atoms/Button';
import Span from '../atoms/Span';
import TimeCards from './TimeCards';
const StyledTimeCardBox = styled.div `
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
  width: 100%;
`;
const TopLayer = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  color: ${(props) => props.theme.colors.dimgray};
  font-family: ${(props) => props.theme.font.nunito};
  font-size: 16px;
  font-weight: 600;
`;
const CardCounter = styled.div `
  letter-spacing: 0.3rem;
`;
const TimeCardsRow = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 105px);
  margin-top: 16px;
  width: 100%;
  text-align: center;
  font-family: ${(props) => props.theme.font.nunito};
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dimgray};
`;
const TimeCardBox = () => {
    const rowsList = ['Site', 'Time', 'Status'];
    const cardsRow = rowsList.map((v, i) => {
        return React.createElement(Span, { key: i }, v);
    });
    return (React.createElement(StyledTimeCardBox, null,
        React.createElement(TopLayer, null,
            React.createElement(CardCounter, null, "(2/4)"),
            React.createElement(Button, { tag: "div", color: theme.colors.violet }, "+ Add")),
        React.createElement(TimeCardsRow, null, cardsRow),
        React.createElement(TimeCards, null)));
};
export default memo(TimeCardBox);
//# sourceMappingURL=TimeCardBox.js.map