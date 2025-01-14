import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import AllScholarship from "../Pages/AllScholarship";
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
    ],
  },
  {
    path: "/dashboard",
    element: <h1>dashboard</h1>,
  },
]);
export default router;
