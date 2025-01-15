import { Outlet } from "react-router-dom";
import Nav from "./Components/Shared/Nav";
import "./App.css";
import AuthProvider from "./Firebase/AuthProvider";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <Nav />
        <Outlet />
      </AuthProvider>

      {/* <h1>footer</h1> */}
    </>
  );
}

export default App;
