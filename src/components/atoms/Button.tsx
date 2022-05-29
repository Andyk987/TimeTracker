import React, { memo } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string & (string | string[]);
  buttonStyle: 'Full' | 'Border';
  size?: 'small' | 'medium' | 'big';
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void;
}

const StyledButton = styled.div<ButtonProps>`
  ${({ theme }) => theme.common.flexCenter};
  background: ${(props) =>
    props.buttonStyle === 'Full' ? props.theme.colors.violet : 'none'};
  border: ${(props) =>
    props.buttonStyle === 'Border'
      ? `2px solid ${props.theme.colors.violet}`
      : 'none'};
  border-radius: 2px;
  color: ${(props) =>
    props.buttonStyle === 'Full' ? 'white' : props.theme.colors.violet};
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;

  ${(props) => {
    switch (props.size) {
      case 'small':
        return css`
          width: 100px;
          height: 27px;
        `;
      case 'medium':
        return css``;
      case 'big':
        return css`
          width: 120px;
          height: 40px;
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  size = 'big',
  buttonStyle,
  onClick,
}) => {
  return (
    <StyledButton
      className={className}
      size={size}
      buttonStyle={buttonStyle}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default memo(Button);
