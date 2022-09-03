import styled from "styled-components";

const StyledNavbar = styled.div`
    background-color: #f8f9fa;
    height: 3rem;
    line-height: 3rem;
    padding: 1rem 0;
    text-align: center;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    font-family: "Aboreto", cursive;
    font-size: 2rem;
`;

export function Navbar({ children }) {
    return <StyledNavbar>{children}</StyledNavbar>;
}
