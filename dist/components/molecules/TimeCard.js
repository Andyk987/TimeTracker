import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import Button from '../atoms/Button';
const StyledTimeCard = styled.div `
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 105px);
  margin-bottom: 10px;
  width: 315px;
  text-align: center;
  background: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;

  &:nth-child(1) {
    margin-top: 10px;
  }

  &:hover {
    transform: translateX(10px);
    transition: all 0.3s ease-in;
    box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.25),
      0px 0px 4px rgba(0, 0, 0, 0.25);

    .hoverTag {
      transition: all 0.3s ease-in;
      background: ${(props) => props.theme.colors.violet};
    }
  }

  &:not(:hover) {
    transition: all 0.3s ease-out;
    .hoverTag {
      transition: all 0.3s ease-out;
    }
  }
`;
const TimeCardData = styled.div `
  margin: 15px 0;
  font-family: ${(props) => props.theme.font.nunito};
  font-weight: 300;
  font-size: 16px;
  color: ${(props) => props.theme.colors.dimgray};
`;
const DetailButton = styled(Button) `
  grid-column-start: 3;
  grid-column-end: 4;
  margin: 0 10px 10px 0;
  justify-cotent: end;

  color: ${(props) => props.theme.colors.violet};
  font-family: ${(props) => props.theme.font.nunito};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.05em;
`;
const HoverTag = styled.div `
  position: absolute;
  width: 4px;
  height: 100%;
  background: white;
  border-radius: 2px 0px 0px 2px;
`;
const TimeCard = ({ children, className, data }) => {
    const currentData = Object.entries(data);
    const handleLeave = () => {
        return css `
      .hoverTag {
        transition: all 0.3s ease-in-out;
        background: silver;
      }
    `;
    };
    return (React.createElement(StyledTimeCard, { className: `${className}`, onMouseLeave: handleLeave },
        React.createElement(HoverTag, { className: "hoverTag" }),
        currentData.map((value, i) => {
            return (React.createElement(TimeCardData, { key: i }, typeof value[1] === 'boolean' ? '✔️' : value[1]));
        }),
        React.createElement(DetailButton, { tag: "div" },
            "-",
            '>',
            " Get Detail")));
};
export default memo(TimeCard);
//# sourceMappingURL=TimeCard.js.map