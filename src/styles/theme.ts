import { DefaultTheme } from "styled-components";


const colors = {
    dimgray: "#565656",
    violet: "#895CF2",
};

const gradientColors = {
    gradientPurple: "linear-gradient(to right, #895cf2 0%, #ffabf4 50%, #895cf2 100%)"
};

const font = {
    sarabun: "'Sarabun', sans-serif",
    nunito: "'Nunito', sans-serif"
};

const common = {
    flexCenter: `
        display: flex;
        align-items: center;
        justify-content: center;
    `
};

export type Colors = typeof colors;
export type GradientColors = typeof gradientColors;
export type Font = typeof font;
export type Common = typeof common;

const theme: DefaultTheme = {
    colors,
    gradientColors,
    font,
    common
};

export default theme;