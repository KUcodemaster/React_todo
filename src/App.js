import { Navbar } from "./components/Navbar";
import { Todo } from "./components/Todo";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Done } from "./components/Done";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    height: 100%;
  }
`;

function App() {
    const [todo, setTodo] = useState(
        JSON.parse(localStorage.getItem("todo")) || []
    );
    const [done, setDone] = useState(
        JSON.parse(localStorage.getItem("done")) || []
    );

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(todo));
    }, [todo]);
    useEffect(() => {
        localStorage.setItem("done", JSON.stringify(done));
    }, [done]);

    const handleDone = (id) => {
        setDone([...done, todo[id]]);
    };

    const handleBack = (id) => {
        setTodo([...todo, done[id]]);
    };

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <GlobalStyle />
                            <div>
                                <Navbar>To Do</Navbar>
                                <Todo
                                    todo={todo}
                                    setTodo={setTodo}
                                    onDone={handleDone}
                                ></Todo>
                                <Done
                                    done={done}
                                    setDone={setDone}
                                    onBack={handleBack}
                                ></Done>
                            </div>
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
