import { Navbar } from "./components/Navbar";
import { Todo } from "./components/Todo";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Done } from "./components/Done";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    height: 100%;
  }
`;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <GlobalStyle />
                            <div>
                                <Navbar>To Do</Navbar>
                                <Todo></Todo>
                                <Done></Done>
                            </div>
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
