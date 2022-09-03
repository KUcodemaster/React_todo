import styled from "styled-components";

const StyledTodo = styled.div`
    border-radius: 5px;
    padding: 2rem;
    background-color: #fff8dc;
    width: 35%;
    margin-left: 7%;
    margin-top: 5%;
    font-size: 2rem;
    line-height: 3rem;
    display: flex;
    flex-direction: column;
`;

export function Done() {
    return <StyledTodo>Done</StyledTodo>;
}
