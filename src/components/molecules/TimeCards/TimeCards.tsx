import AddIcon from '../../../assets/add-icon.svg';
import React, { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Card, { StyledCard } from './Card';
import CardContent from '../CardContent';
import { ReduxTimeTrackerData } from '../../../features/time/timeSlice';
import CardContentTimer from '../Timer/CardContentTimer';

const TOTAL_DATA_LEN = 4;

type SwitchButtonType = {
  switchType: 'check' | 'delete';
  state: boolean;
};

interface TimeCardsProps {
  data: ReduxTimeTrackerData[];
  currentIndex: number;
  handleCardSwitch?: (isChecking: boolean, url: string) => void;
  handleAddCard?: () => void;
  handleDeleteCard?: (url: string) => void;
  handleClickCard?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
    i: number
  ) => void;
}

const StyledTimeCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: start;
  gap: 10px;
  padding-top: 10px;
  width: 100%;
  height: 205px;
  max-height: 205px;
  overflow: scroll;
`;

const SwitchButton = styled.div<SwitchButtonType>`
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
  width: 55px;
  height: 24px;
  color: white;
  font-family: ${(props) => props.theme.font.nunito};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  background: white;
  box-shadow: none;
  border-radius: 22px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.switchType === 'check' ? '0px 0px 4px rgba(0, 0, 0, 0.25)' : 'none'};
  transition: all 0.3s ease-in-out;

  &:after {
    content: ${(props) => (props.switchType === 'check' ? `''` : ``)};
    position: absolute;
    margin: 3px;
    width: 18px;
    height: 18px;
    background: ${(props) =>
      props.state ? props.theme.colors.darkRed : 'rgba(0, 0, 0, 0.5)'};
    border-radius: 22px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    left: ${(props) => (props.state ? '31px' : '0')};
    transition: all 0.3s cubic-bezier(0.59, 0.46, 0.46, 0.85);
  }

  ${StyledCard}:hover && {
    transition: all 0.3s ease-in-out;
    background: ${(props) =>
      props.switchType === 'delete' ? props.theme.colors.darkRed : 'white'};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  }
`;

const CheckingState = styled.span`
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
`;

const TimeCards: React.FC<TimeCardsProps> = ({
  data = [],
  currentIndex,
  handleCardSwitch,
  handleAddCard,
  handleDeleteCard,
  handleClickCard,
}) => {
  const [dataLen, setDataLen] = useState(0);

  useEffect(() => {
    setDataLen(data.length);
  }, [data.length]);

  const timerCards =
    data &&
    data.map((v, i) => {
      return (
        <Card
          key={i}
          cardType="Time"
          isCurrent={i === currentIndex}
          onClick={(e) => handleClickCard(e, i)}
        >
          <CardContent content={v.title} />
          <CardContentTimer record={v.timeRecord} />
          <CardContent>
            {i === currentIndex ? (
              <CheckingState className="content">
                {v.isChecking ? 'O' : 'X'}
              </CheckingState>
            ) : (
              <SwitchButton
                className="content"
                switchType="check"
                state={v.isChecking}
                onClick={() => handleCardSwitch(v.isChecking, v.url)}
              />
            )}
          </CardContent>
          <CardContent>
            <SwitchButton
              className="content"
              switchType="delete"
              state={v.isChecking}
              onClick={() => handleDeleteCard(v.url)}
            >
              x
            </SwitchButton>
          </CardContent>
        </Card>
      );
    });

  const addCards = Array.from(Array(TOTAL_DATA_LEN - dataLen)).map((_, i) => {
    return (
      <Card key={i} cardType="Add" onClick={handleAddCard}>
        <CardContent>
          <AddIcon width="25" height="25" />
        </CardContent>
      </Card>
    );
  });

  return (
    <StyledTimeCards>
      {timerCards}
      {addCards}
    </StyledTimeCards>
  );
};

export default memo(TimeCards);
