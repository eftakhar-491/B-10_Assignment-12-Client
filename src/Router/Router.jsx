import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import AllScholarship from "../Pages/AllScholarship";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import Profile from "../Components/DashboardComponents/Profile";
import Applications from "../Components/DashboardComponents/Applications";
import Reviews from "../Components/DashboardComponents/Reviews";
import AddScholarship from "../Components/DashboardComponents/AddScholarship";
import MangeScholarship from "../Components/DashboardComponents/MangeScholarship";
import AllReviews from "../Components/DashboardComponents/AllReviews";
import AppliedScholarship from "../Components/DashboardComponents/appliedScholarship";
import AuthProvider from "../Firebase/AuthProvider";
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
    element: (
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "applications",
        element: <Applications />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "add-scholarship",
        element: <AddScholarship />,
      },
      {
        path: "mange-scholarship",
        element: <MangeScholarship />,
      },
      {
        path: "all-reviews",
        element: <AllReviews />,
      },
      {
        path: "applied-scholarship",
        element: <AppliedScholarship />,
      },
    ],
  },
]);
export default router;
