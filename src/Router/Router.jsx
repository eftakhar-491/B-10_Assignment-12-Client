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
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import Payment from "../Components/Shared/Payment";
import Error from "../Pages/Error";
import AuthProtect from "../Components/ProtectRoute/AuthProtect";
import ComProtect from "../Components/ProtectRoute/ComProtect";
import RoleProtect from "../Components/ProtectRoute/RoleProtect";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
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
        path: "/scholarshipdetails/:id",
        element: (
          <ComProtect>
            <ScholarshipDetails />,
          </ComProtect>
        ),
      },

      {
        path: "/login",
        element: (
          <AuthProtect>
            <Login />,
          </AuthProtect>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthProtect>
            <Register />,
          </AuthProtect>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <ComProtect>
          <Dashboard />
        </ComProtect>
      </AuthProvider>
    ),
    children: [
      {
        path: "profile",
        element: (
          <RoleProtect role={["User", "Moderator"]}>
            <Profile />,
          </RoleProtect>
        ),
      },
      {
        path: "applications",
        element: (
          <RoleProtect role={["User"]}>
            <Applications />,
          </RoleProtect>
        ),
      },
      {
        path: "reviews",
        element: (
          <RoleProtect role={["User"]}>
            <Reviews />,
          </RoleProtect>
        ),
      },
      {
        path: "add-scholarship",
        element: (
          <RoleProtect role={["Moderator"]}>
            <AddScholarship />,
          </RoleProtect>
        ),
      },
      {
        path: "mange-scholarship",
        element: (
          <RoleProtect role={["Moderator"]}>
            <MangeScholarship />,
          </RoleProtect>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <RoleProtect role={["Moderator"]}>
            <AllReviews />,
          </RoleProtect>
        ),
      },
      {
        path: "applied-scholarship",
        element: (
          <RoleProtect role={["Moderator"]}>
            <AppliedScholarship />,
          </RoleProtect>
        ),
      },
    ],
  },
]);
export default router;
