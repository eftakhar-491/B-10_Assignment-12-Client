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
import AuthProvider from "../Firebase/AuthProvider";
import ScholarshipDetails from "../Pages/ScholarshipDetails";
import Payment from "../Components/Shared/Payment";
import Error from "../Pages/Error";
import AuthProtect from "../Components/ProtectRoute/AuthProtect";
import ComProtect from "../Components/ProtectRoute/ComProtect";
import RoleProtect from "../Components/ProtectRoute/RoleProtect";
import AppliedScholarship from "../Components/DashboardComponents/AppliedScholarship";
import AdminProfile from "../Components/DashboardComponents/AdminProfile";
import ManageUser from "../Components/DashboardComponents/ManageUser";
import { ThemeProvider } from "../Context/ThemeContext";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
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
        path: "/aboutus",
        element: <AboutUs />,
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
        path: "/contactus",
        element: (
          <ComProtect>
            <ContactUs />,
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
      <ThemeProvider>
        <AuthProvider>
          <ComProtect>
            <Dashboard />
          </ComProtect>
        </AuthProvider>
      </ThemeProvider>
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
          <RoleProtect role={["User", "Moderator", "Admin"]}>
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
          <RoleProtect role={["Moderator", "Admin"]}>
            <AddScholarship />,
          </RoleProtect>
        ),
      },
      {
        path: "manage-scholarship",
        element: (
          <RoleProtect role={["Moderator", "Admin"]}>
            <MangeScholarship />,
          </RoleProtect>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <RoleProtect role={["Moderator", "Admin"]}>
            <AllReviews />,
          </RoleProtect>
        ),
      },
      {
        path: "applied-scholarship",
        element: (
          <RoleProtect role={["Moderator", "Admin"]}>
            <AppliedScholarship />,
          </RoleProtect>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <RoleProtect role={["Admin"]}>
            <AdminProfile />
          </RoleProtect>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RoleProtect role={["Admin"]}>
            <ManageUser />
          </RoleProtect>
        ),
      },
    ],
  },
]);
export default router;
