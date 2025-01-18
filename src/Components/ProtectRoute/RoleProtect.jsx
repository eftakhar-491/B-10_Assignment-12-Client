import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Firebase/AuthProvider";

const RoleProtect = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  if (!role.includes(user?.userDB?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleProtect;
