import React, { memo } from "react";
import styled from "styled-components";
const StyledSpan = styled.span `
  display: block;
  width: ${(props) => props.width};
`;
const Span = ({ children, width = "auto" }) => {
    const defaultProps = {
        width,
    };
    return React.createElement(StyledSpan, Object.assign({}, defaultProps), children);
};
export default memo(Span);
//# sourceMappingURL=Span.js.map