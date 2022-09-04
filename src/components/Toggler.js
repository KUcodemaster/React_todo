import styled from "styled-components";
import toggleOn from "../assets/toggle_on.svg";
import toggleOff from "../assets/toggle_off.svg";

export const StyledToggler = styled.img`
    margin-left: auto;
    vertical-align: middle;
    float: right;
`;

export function Toggler({ mode, onClick }) {
    return (
        <StyledToggler
            src={mode === "on" ? toggleOn : toggleOff}
            onClick={onClick}
            alt={mode === "on" ? "감추기" : "보이기"}
        />
    );
}
