import { Outlet } from "react-router-dom";
import Nav from "./Components/Shared/Nav";
import "./App.css";
import AuthProvider from "./Firebase/AuthProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StateContext from "./Context/StateContext";
import { useState } from "react";
import Footer from "./Components/Shared/Footer";
const queryClient = new QueryClient();
function App() {
  const [applyModal, setApplyModal] = useState(false);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StateContext.Provider value={{ applyModal, setApplyModal }}>
          <AuthProvider>
            <ToastContainer />
            <Nav />
            <Outlet />
            <Footer />
          </AuthProvider>
        </StateContext.Provider>
      </QueryClientProvider>

      {/* <h1>footer</h1> */}
    </>
  );
}

export default App;
