import React, { memo } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";
import Div from "../atoms/Div";

interface MenuButtonProps {
  children?: React.ReactChild;
}

const StyledMenuButton = styled.div`
  display: flex;
`;

const StyledLine = styled.div`
  background-color: black;
  width: 20px;
  height: 2px;
  &:nth-child(1) {
    margin-top: 3px;
    margin-bottom: 2px;
  }
  &:nth-child(2) {
    margin-top: 2px;
    margin-bottom: 2px;
  }
  &:nth-child(3) {
    margin-top: 2px;
    margin-bottom: 3px;
  }
  border-radius: 1px;
`;

const MenuButton = ({ children }: MenuButtonProps) => {
  return (
    <StyledMenuButton>
      <Button tag="div">
        {Array.from(Array(3), () => (
          <StyledLine></StyledLine>
        ))}
        {/* <FontAwesomeIcon icon={faBars} /> */}
      </Button>
    </StyledMenuButton>
  );
};

export default memo(MenuButton);
