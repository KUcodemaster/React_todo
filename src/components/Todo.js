import { useState } from "react";
import styled from "styled-components";
import { Toggler, StyledToggler } from "./Toggler";
import reviseImg from "../assets/revise.svg";
import deleteImg from "../assets/delete.svg";
import doneImg from "../assets/done.svg";
import { BsCheckSquare, BsCheckLg } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";

const StyledTodo = styled.div`
    border-radius: 5px;
    padding: 2rem;
    background-color: #fff8dc;
    width: 35%;
    margin-left: 7%;
    margin-top: 5%;
    font-size: 2rem;
    line-height: 3rem;
    display: inline-block;
    flex-direction: column;
    @media screen and (max-width: 768px) {
        width: 70%;
    }
`;

const StyledButton = styled(StyledToggler)`
    width: 2rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
`;

const StyledInput = styled.input`
    width: 100%;
    font-size: 1.5rem;
    margin-top: 1rem;
`;

const StyledLi = styled.li`
    font-size: 1.5rem;
    display: flex;
    padding: 0.5rem;
`;

const StyledListInput = styled.input`
    width: 80%;
    font-size: 1.25rem;
    display: flex;
    padding: 0.25rem;
    @media screen and (max-width: 768px) {
        width: 70%;
    }
`;

function Input({ value, onChange, onKeyDown, placeholder }) {
    return (
        <StyledInput
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
        ></StyledInput>
    );
}

export function ListItem({ children, onDelete, id, onRevise, onDone, onBack }) {
    const [mode, setMode] = useState("view");
    const [value, setValue] = useState(children);

    const handleReviseClick = (e) => {
        mode === "view" ? setMode("revise") : setMode("view");
        onRevise(id, value);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && value) {
            e.preventDefault();
            handleReviseClick();
        }
    };

    const handleDeleteTodoClick = () => {
        onDelete(id);
    };

    const handleDone = () => {
        onDone(id);
        onDelete(id);
    };

    const handleBack = () => {
        onBack(id);
    };

    return (
        <>
            {mode === "view" ? (
                <StyledLi>
                    {value}
                    <span
                        style={{
                            margin: "auto 0 auto auto",
                        }}
                    >
                        <StyledButton
                            src={deleteImg}
                            onClick={handleDeleteTodoClick}
                            id={id}
                        />
                        {onBack && (
                            <RiArrowGoBackFill
                                style={{
                                    height: "2rem",
                                    width: "1.5rem",
                                    verticalAlign: "top",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                }}
                                onClick={handleBack}
                            ></RiArrowGoBackFill>
                        )}
                        {onDone && (
                            <BsCheckLg
                                style={{
                                    height: "2rem",
                                    width: "1.5rem",
                                    verticalAlign: "top",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                }}
                                onClick={handleDone}
                            />
                        )}
                        {onRevise && (
                            <StyledButton
                                src={reviseImg}
                                onClick={handleReviseClick}
                                id={id}
                            />
                        )}
                    </span>
                </StyledLi>
            ) : (
                <StyledLi>
                    <StyledListInput
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    ></StyledListInput>
                    <span style={{ margin: "auto 0 auto auto" }}>
                        <StyledButton
                            src={doneImg}
                            onClick={handleReviseClick}
                        />
                    </span>
                </StyledLi>
            )}
        </>
    );
}

export function Todo({ todo, setTodo, onDone }) {
    const [mode, setMode] = useState("on");
    const [value, setValue] = useState("");
    const handleToggleClick = () => {
        if (mode === "on") {
            setMode("off");
        } else {
            setMode("on");
        }
    };
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handleSubmit = (e) => {
        if (e.keyCode === 13 && value) {
            e.preventDefault();
            setTodo([...todo, e.target.value]);
            setValue("");
        }
    };
    const handleDeleteTodo = (id) => {
        const nextTodo = todo.filter((item, index) => index !== id);
        setTodo(nextTodo);
    };

    const handleRevise = (id, value) => {
        setTodo(todo.map((item, index) => (id === index ? value : item)));
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
                <BsCheckSquare
                    style={{ marginRight: "10px", marginBottom: "3px" }}
                ></BsCheckSquare>
                할 일
                <Toggler mode={mode} onClick={handleToggleClick}>
                    보이기
                </Toggler>
            </span>
            {mode === "on" && (
                <ul>
                    {todo.map((item, i) => (
                        <ListItem
                            key={String(item) + String(i)}
                            id={i}
                            onDelete={handleDeleteTodo}
                            onRevise={handleRevise}
                            onDone={onDone}
                        >
                            {item}
                        </ListItem>
                    ))}
                </ul>
            )}
            {mode === "on" && (
                <Input
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    placeholder="오늘은 뭘 하지?"
                />
            )}
        </StyledTodo>
    );
}
