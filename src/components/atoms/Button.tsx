import React, { memo } from 'react';
import styled from 'styled-components';

interface ButtonStyles {
  width?: string;
  height?: string;
  color?: string;
  bgColor?: string;
  border?: string;
  radius?: string;
  gap?: string;
}

interface ButtonProps extends ButtonStyles {
  children?: React.ReactNode;
  tag?: 'button' | 'div';
  icon?: SVGAElement;
  url?: string;
  className?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : 'auto')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  color: ${(props) => props.color};
  background: ${(props) => (props.bgColor ? props.bgColor : 'none')};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.radius};
  gap: ${(props) => props.gap};
`;

const Button: React.FC<ButtonProps> = ({
  children,
  tag,
  icon,
  url,
  className,
  onClick,
  ...args
}) => {
  return (
    <StyledButton {...args} as={tag} onClick={onClick} className={className}>
      {children}
    </StyledButton>
  );
};

export default memo(Button);
