import React from "react";
import styled from "styled-components";
import Span from "../atoms/Span";
import MenuButton from "../molecules/MenuButton";
import Title from "../molecules/Title";

interface HeaderProps {
  children?: React.ReactChild;
}

const StyledHeader = styled.div`
  display: flex;
  background-color: #606060;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const Header = ({ children }: HeaderProps) => {
  return (
    <StyledHeader>
      <MenuButton />
      <Title>
        <Span>Time Tracker</Span>
      </Title>
    </StyledHeader>
  );
};

export default Header;
