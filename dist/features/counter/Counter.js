import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCount } from './counterSlice';
const StyledConter = styled.div ``;
const Counter = () => {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');
    return React.createElement(StyledConter, null);
};
export default Counter;
//# sourceMappingURL=Counter.js.map