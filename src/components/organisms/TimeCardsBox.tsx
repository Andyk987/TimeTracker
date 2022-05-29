import classNames from 'classnames';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { START_CHECKING, STOP_CHECKING } from '../../constants/timeConstants';
import { commonActions } from '../../features/common/commonSlice';
import { timeActions } from '../../features/time/timeSlice';
import useChromeMessage from '../../hooks/useChromeMessage';
import TimeCards from '../molecules/TimeCards/TimeCards';
import TimeCardsLayer from '../molecules/TimeCards/TimeCardsLayer';

const StyledTimeCardsBox = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  flex-direction: column;
  width: 100%;
`;

const TimeCardsBox: React.FC = ({}) => {
  const [msg, sendMessage] = useChromeMessage('timer', 1000);
  const data = useAppSelector((state: RootState) => state.time.timeTrackerData);
  const currentIndex = useAppSelector(
    (state: RootState) => state.time.currentIndex
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!msg) return;
    if (msg.code.includes('ERROR'))
      return sendMessage({
        code: msg?.prevCode,
        data: { timeTrackerData: { url: msg.data.timeTrackerData.url } },
      });

    return () => {};
  }, [msg]);

  const handleCardSwitch = (isChecking: boolean, url: string) => {
    const msg = isChecking ? STOP_CHECKING : START_CHECKING;
    sendMessage({ code: msg, data: { timeTrackerData: { url } } });
  };

  const handleAddCard = () => {
    dispatch(
      commonActions.toogleModal({ modalType: 'urlModal', modalState: true })
    );
  };

  const handleDeleteCard = (deleteUrl: string) => {
    dispatch(
      commonActions.toogleModal({
        modalType: 'deleteModal',
        modalState: true,
        modalMetaData: { url: deleteUrl },
      })
    );
  };

  const handleClickCard = (e, i) => {
    const classList = e.target.className.split(' ');
    if (classList.includes('content')) return;
    dispatch(timeActions.setCurrentIndex(i));
  };

  return (
    <StyledTimeCardsBox>
      <TimeCardsLayer cardLength={data?.length} />
      <TimeCards
        currentIndex={currentIndex}
        data={data}
        handleCardSwitch={handleCardSwitch}
        handleAddCard={handleAddCard}
        handleDeleteCard={handleDeleteCard}
        handleClickCard={handleClickCard}
      />
    </StyledTimeCardsBox>
  );
};

export default TimeCardsBox;
