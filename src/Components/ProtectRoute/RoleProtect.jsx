import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Firebase/AuthProvider";

const RoleProtect = ({ children, role }) => {
  const { user, logOut } = useContext(AuthContext);

  if (!role.includes(user?.userDB?.role)) {
    logOut();
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleProtect;
