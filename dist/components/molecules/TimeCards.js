import React, { memo } from 'react';
import styled from 'styled-components';
import TimeCard from './TimeCard';
const StyledTimeCards = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 375px;
  width: 375px;
  height: 200px;
  overflow: scroll;
`;
const TimeCards = () => {
    const mockedData = [
        { site: 'Youtube', time: '4h3m2s', status: true },
        { site: 'Google', time: '34m14s', status: false },
        { site: 'Naver', time: '34m14s', status: false },
        { site: 'Github', time: '34m14s', status: false },
    ];
    const cards = mockedData.map((v, i) => {
        return (React.createElement(TimeCard, { key: i, className: 'TimeCard', data: {
                site: v.site,
                time: v.time,
                status: v.status,
            } }));
    });
    return React.createElement(StyledTimeCards, null, cards);
};
export default memo(TimeCards);
//# sourceMappingURL=TimeCards.js.map