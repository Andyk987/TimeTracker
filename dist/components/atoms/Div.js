import React, { memo } from "react";
import styled from "styled-components";
const StyledDiv = styled.div `
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width}l;
  height: ${(props) => props.height};
  border: none;
  background-color: ${(props) => props.bgColor};
`;
const Div = ({ children, width = "auto", height = "auto" }) => {
    const defaultprops = {
        width,
        height,
    };
    return React.createElement(StyledDiv, Object.assign({}, defaultprops), children);
};
export default memo(Div);
//# sourceMappingURL=Div.js.map