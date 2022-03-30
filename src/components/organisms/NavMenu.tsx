import React from "react";
import styled from "styled-components";
import NavButtons from "../molecules/NavButtons";

const StyledNavMenu = styled.div`
    display: flex;
    justify-content: center;
`

const NavMenu = () => {
    return (
        <StyledNavMenu>
            <NavButtons
                texts={["Timer", "Record"]}
            >

            </NavButtons>
        </StyledNavMenu>
    );
}

export default NavMenu;