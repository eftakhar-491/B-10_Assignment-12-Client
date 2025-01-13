import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <h1>home</h1>,
      },
      {
        path: "/about",
        element: <h1>about</h1>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <h1>dashboard</h1>,
  },
]);
export default router;
