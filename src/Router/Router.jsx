import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import AllScholarship from "../Pages/AllScholarship";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/scholarships",
        element: <AllScholarship />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <h1>dashboard</h1>,
  },
]);
export default router;
