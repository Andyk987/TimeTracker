import React from 'react';
import styled from 'styled-components';
import Span from '../atoms/Span';
import MenuButton from '../molecules/MenuButton';
import Title from '../molecules/Title';

interface HeaderProps {
  children?: React.ReactChild;
}

const StyledHeader = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  color: ${(props) => props.theme.colors.dimgray};
  padding-top: 1rem;
`;

const Header = ({ children }: HeaderProps) => {
  return (
    <StyledHeader>
      <Title>
        <Span>Time Tracker</Span>
      </Title>
    </StyledHeader>
  );
};

export default Header;
