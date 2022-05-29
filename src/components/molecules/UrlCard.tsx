import React, { useRef } from 'react';
import { memo } from 'react';
import styled from 'styled-components';

interface UrlCardProps {
  children?: React.ReactNode;
  history?: chrome.history.HistoryItem;
  handleUrlCardClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
    url: string,
    title: string
  ) => void;
}

const StyledUrlCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;

  width: inherit;
  height: 35px;

  font-family: ${(props) => props.theme.font.nunito};
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.dimgray};
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #eee;
  }

  &:focus {
    background-color: #eee;
    outline: none;
  }
`;

const UrlCardSpan = styled.span`
  display: inline-block;
  align-items: center;
  justify-content: start;
  padding: 0 10px 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UrlCard: React.FC<UrlCardProps> = ({ history, handleUrlCardClick }) => {
  return (
    <StyledUrlCard
      onClick={(e) => handleUrlCardClick(e, history.url, history.title)}
    >
      <UrlCardSpan>{history?.title}</UrlCardSpan>
      <UrlCardSpan>{history?.url}</UrlCardSpan>
    </StyledUrlCard>
  );
};

export default memo(UrlCard);
