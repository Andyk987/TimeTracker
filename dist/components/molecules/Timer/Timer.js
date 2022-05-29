import React, { memo } from 'react';
import styled from 'styled-components';
import TimerCard from './TimerCard';
const StyledTimer = styled.div `
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 110px;
  background: ${(props) => props.theme.gradientColors.gradientPurple};
  background-size: 300% 300%;
  border-radius: 5px;
  gap: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;
const Timer = ({ time }) => {
    const timerList = [
        { info: 'H', value: time.hour },
        { info: 'M', value: time.minute },
        { info: 'S', value: time.seconds },
    ];
    const result = timerList.map((v, i) => {
        return (React.createElement(TimerCard, { key: i, timerData: {
                info: v.info,
                value: v.value,
            } }));
    });
    return React.createElement(StyledTimer, null, result);
};
export default memo(Timer);
//# sourceMappingURL=Timer.js.map