import { Navbar } from "./components/Navbar";
import { Todo } from "./components/Todo";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Done } from "./components/Done";

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
                <Todo></Todo>
                <Done></Done>
            </div>
        </>
    );
}

export default App;
