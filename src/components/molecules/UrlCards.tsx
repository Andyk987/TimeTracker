import React, { createRef, memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import UrlCard from './UrlCard';

interface UrlCardsProps {
  children?: React.ReactNode;
  historyList?: chrome.history.HistoryItem[];
  moveFocusIndex?: number;
  handleUrlCardClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
    url: string,
    title: string
  ) => void;
}

const StyledUrlCards = styled.div<{ isList?: boolean }>`
  margin: 10px 0;
  width: inherit;
  max-height: 90px;
  height: ${(props) => (props.isList ? '100%' : '0px')};
  overflow: scroll;
  background: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
`;

const UrlCard = styled.div`
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

const UrlCards: React.FC<UrlCardsProps> = ({
  historyList,
  moveFocusIndex,
  handleUrlCardClick,
}) => {
  const [list, setList] = useState<chrome.history.HistoryItem[]>([]);
  const testRef = useRef([]);

  useEffect(() => {
    if (historyList.length === 0) return;
    Array(historyList.length)
      .fill(null)
      .map((v, i) => {
        testRef.current[i] = createRef();
      });

    const compare = (
      a: chrome.history.HistoryItem,
      b: chrome.history.HistoryItem
    ) => {
      if (a.url.length > b.url.length) return 1;
      else return -1;
    };

    setList(historyList.sort(compare));
  }, [historyList]);

  useEffect(() => {
    if (moveFocusIndex === -1) return;
    testRef.current[moveFocusIndex].current.focus();
  }, [moveFocusIndex]);

  return (
    <StyledUrlCards isList={historyList.length > 0 ? true : false}>
      {list.map((v, i) => {
        return (
          <UrlCard
            tabIndex={-1}
            ref={testRef.current[i]}
            onClick={(e) => handleUrlCardClick(e, list[i].url, list[i].title)}
          >
            <UrlCardSpan>{list[i].title}</UrlCardSpan>
            <UrlCardSpan>{list[i].url}</UrlCardSpan>
          </UrlCard>
        );
      })}
    </StyledUrlCards>
  );
};

export default memo(UrlCards);
