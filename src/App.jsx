import { Outlet } from "react-router-dom";
import Nav from "./Components/Shared/Nav";
import "./App.css";
function App() {
  return (
    <>
      <Nav />
      <Outlet />

      {/* <h1>footer</h1> */}
    </>
  );
}

export default App;
