import React, { memo } from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  children?: React.ReactNode;
  cardType: 'Time' | 'Add';
  isCurrent?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void;
}

export const StyledCard = styled.div<CardProps>((props) => ({
  'position': 'relative',
  'width': '315px',
  'height': '80px',
  'maxHeight': '80px',
  'fontFamily': props.theme.font.nunito,
  'fontWeight': '300',
  'fontSize': '16px',
  'color': props.theme.colors.dimgray,
  'borderRadius': '2px',
  'boxShadow': '0px 0px 4px rgba(0, 0, 0, 0.25)',
  'cursor': props.cardType === 'Add' ? 'pointer' : 'auto',
  'transition': 'all 0.3s ease-in-out',

  ':nth-child(1)': {
    marginTop: '2px',
  },
  ':nth-last-child(1)': {
    marginBottom: '20px',
  },

  ':hover':
    props.cardType === 'Time' && !props.isCurrent
      ? {
          transform: 'scale(1.05)',
        }
      : {},
}));

const Wrapper = styled.div<CardProps>`
  ${(props) => {
    switch (props.cardType) {
      case 'Time':
        return css`
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 40px);
        `;
      case 'Add':
        return css`
          ${({ theme }) => theme.common.flexCenter};
          width: 100%;
          height: 80px;
        `;
    }
  }}
`;

const Tag = styled.div<CardProps>`
  position: absolute;
  left: 0;
  width: 4px;
  height: 100%;
  background: ${(props) =>
    props.isCurrent ? props.theme.colors.violet : 'transparent'};
  border-radius: 2px 0 0 2px;
  transition: all 0.3s ease-in-out;
`;

const Card: React.FC<CardProps> = ({
  children,
  cardType = 'Time',
  isCurrent,
  onClick,
}) => {
  return (
    <StyledCard onClick={onClick} cardType={cardType} isCurrent={isCurrent}>
      <Wrapper cardType={cardType}>
        <Tag cardType={cardType} isCurrent={isCurrent} />
        {children}
      </Wrapper>
    </StyledCard>
  );
};

export default memo(Card);
