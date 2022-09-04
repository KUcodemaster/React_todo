import styled from "styled-components";
import { BsCheckSquareFill } from "react-icons/bs";
import { Toggler } from "./Toggler";
import { useState } from "react";
import { ListItem } from "./Todo";

const StyledTodo = styled.div`
    border-radius: 5px;
    padding: 2rem;
    background-color: #fff8dc;
    width: 35%;
    margin-right: 6%;
    margin-top: 5%;
    font-size: 2rem;
    line-height: 3rem;
    float: right;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        width: 70%;
        margin-left: 7%;
        float: none;
        margin-right: 0;
        display: inline-block;
    }
`;

export function Done({ done, setDone, onBack }) {
    const [mode, setMode] = useState("on");
    const handleToggleClick = () => {
        if (mode === "on") {
            setMode("off");
        } else {
            setMode("on");
        }
    };
    const handleDelete = (id) => {
        const nextDone = done.filter((item, index) => index !== id);
        setDone(nextDone);
    };

    const handleBack = (id) => {
        onBack(id);
        handleDelete(id);
    };

    return (
        <StyledTodo>
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    lineHeight: "3rem",
                }}
            >
                <BsCheckSquareFill
                    style={{ marginRight: "10px", marginBottom: "3px" }}
                ></BsCheckSquareFill>
                한 일
                <Toggler mode={mode} onClick={handleToggleClick}>
                    보이기
                </Toggler>
            </span>
            {mode === "on" && (
                <ul>
                    {done.map((item, i) => (
                        <ListItem
                            key={String(item) + String(i)}
                            id={i}
                            onDelete={handleDelete}
                            onBack={handleBack}
                        >
                            {item}
                        </ListItem>
                    ))}
                </ul>
            )}
        </StyledTodo>
    );
}
