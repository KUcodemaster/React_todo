import { Navbar } from "./components/Navbar";
import { Todo } from "./components/Todo";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    height: 100%;
  }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <div>
                <Navbar>To Do</Navbar>
                <Todo>✓ 할 일</Todo>
            </div>
        </>
    );
}

export default App;
