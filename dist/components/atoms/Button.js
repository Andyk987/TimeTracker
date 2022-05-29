var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { memo } from 'react';
import styled from 'styled-components';
const StyledButton = styled.button `
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: ${(props) => (props.width ? props.width : 'auto')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  color: ${(props) => props.color};
  background: ${(props) => (props.bgColor ? props.bgColor : 'none')};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.radius};
  gap: ${(props) => props.gap};
`;
const Button = (_a) => {
    var { children, tag, icon, url, className, onClick } = _a, args = __rest(_a, ["children", "tag", "icon", "url", "className", "onClick"]);
    return (React.createElement(StyledButton, Object.assign({}, args, { as: tag, onClick: onClick, className: className }), children));
};
export default memo(Button);
//# sourceMappingURL=Button.js.map