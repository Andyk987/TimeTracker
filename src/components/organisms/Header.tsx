import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { commonActions } from '../../features/common/commonSlice';
import Title from '../molecules/Title';

interface HeaderProps {
  children?: React.ReactChild;
}

const StyledHeader = styled.div`
  ${({ theme }) => theme.common.flexCenter};
  margin-top: 20px;
  color: ${(props) => props.theme.colors.dimgray};
  cursor: pointer;
`;

const TitleSpan = styled.span`
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 0.5rem;
`;

const Header = ({}: HeaderProps) => {
  const currentIndex = useAppSelector(
    (state: RootState) => state.time.currentIndex
  );
  const currentTitle = useAppSelector(
    (state: RootState) => state.time.timeTrackerData[currentIndex]?.title
  );
  const currentUrl = useAppSelector(
    (state: RootState) => state.time.timeTrackerData[currentIndex]?.url
  );

  const dispatch = useDispatch();

  const handleHeader = useCallback(() => {
    dispatch(
      commonActions.toogleModal({
        modalType: 'editModal',
        modalState: true,
        modalMetaData: { url: currentUrl },
      })
    );
  }, [currentUrl]);

  return (
    <StyledHeader onClick={handleHeader}>
      <Title>
        <FontAwesomeIcon icon={faChevronDown} width="12px" height="15px" />
        <TitleSpan>{currentTitle ? currentTitle : 'Time'} Tracker</TitleSpan>
      </Title>
    </StyledHeader>
  );
};

export default Header;
