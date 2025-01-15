import { Outlet } from "react-router-dom";
import Nav from "./Components/Shared/Nav";
import "./App.css";
import AuthProvider from "./Firebase/AuthProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer />
          <Nav />
          <Outlet />
        </AuthProvider>
      </QueryClientProvider>

      {/* <h1>footer</h1> */}
    </>
  );
}

export default App;
