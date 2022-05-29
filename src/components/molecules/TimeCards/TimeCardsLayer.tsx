import React, { memo } from 'react';
import styled from 'styled-components';
import Span from '../../atoms/Span';

interface TimeCardsLayerProps {
  cardLength: number;
}

const StyledTimeCardsLayer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 315px;
  color: ${(props) => props.theme.colors.dimgray};
  font-family: ${(props) => props.theme.font.nunito};
  font-size: 16px;
  font-weight: 600;
`;

const TopLayer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomLayer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 105px);
  width: 100%;
  text-align: center;
  font-family: ${(props) => props.theme.font.nunito};
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dimgray};
`;

const CardCounter = styled.div`
  letter-spacing: 0.3rem;
`;

const CardsRowList = ['Site', 'Time', 'State'];

const TimeCardsLayer: React.FC<TimeCardsLayerProps> = ({ cardLength = 0 }) => {
  const cardsRow = CardsRowList.map((v, i) => {
    return <Span key={i}>{v}</Span>;
  });

  return (
    <StyledTimeCardsLayer>
      <TopLayer>
        <CardCounter>{cardLength}/4</CardCounter>
      </TopLayer>
      <BottomLayer>{cardsRow}</BottomLayer>
    </StyledTimeCardsLayer>
  );
};

export default memo(TimeCardsLayer);
