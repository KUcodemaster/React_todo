import { useEffect, useState } from "react";
import styled from "styled-components";
import toggleOn from "../assets/toggle_on.svg";
import toggleOff from "../assets/toggle_off.svg";
import reviseImg from "../assets/revise.svg";
import deleteImg from "../assets/delete.svg";
import doneImg from "../assets/done.svg";

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

const StyledToggler = styled.img`
    margin-left: auto;
    vertical-align: middle;
    float: right;
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
    width: 20vw;
    font-size: 1.25rem;
    display: flex;
    padding: 0.25rem;
`;

function Toggler({ mode, onClick }) {
    return (
        <StyledToggler
            src={mode === "on" ? toggleOn : toggleOff}
            onClick={onClick}
            alt={mode === "on" ? "감추기" : "보이기"}
        />
    );
}

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

function ListItem({ children, onDelete, id }) {
    const [mode, setMode] = useState("view");
    const [value, setValue] = useState(children);

    const handleReviseClick = () => {
        mode === "view" ? setMode("revise") : setMode("view");
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

    const handleDeleteClick = () => {
        onDelete(id);
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
                            onClick={handleDeleteClick}
                            id={id}
                        />
                        <StyledButton
                            src={reviseImg}
                            onClick={handleReviseClick}
                        />
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

export function Todo() {
    const [mode, setMode] = useState("on");
    const [todo, setTodo] = useState([]);
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
    const handleDelete = (id) => {
        const nextTodo = todo.filter((item, index) => index !== id);
        setTodo(nextTodo);
    };

    return (
        <StyledTodo>
            <span>
                ✓ 할 일
                <Toggler mode={mode} onClick={handleToggleClick}>
                    보이기
                </Toggler>
            </span>
            {mode === "on" && (
                <ul>
                    {todo.map((item, i) => (
                        <ListItem key={item} id={i} onDelete={handleDelete}>
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
