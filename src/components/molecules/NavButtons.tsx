import React, { memo } from "react";
import styled from "styled-components";
import Button from "../atoms/Button";

interface NavButtonsProps {
    children?: React.ReactNode;
    texts?: string[];
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>) => void;
}

const StyledNavButtons = styled.div<NavButtonsProps>`
    display: flex;
    width: 170px;
    justify-content: space-between;

    font-family: 'Sarabun', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 26px;
    color: #895CF2;
`;

const NavButtons = (props: NavButtonsProps) => {

    const buttons = props.texts.map((v, i) =>
        <Button
            key={i}
            tag="div"
            onClick={props.onClick}
        >
            {v}
        </Button>
    );

    return (
        <StyledNavButtons>
            {buttons}
        </StyledNavButtons>
    )
};

export default memo(NavButtons);