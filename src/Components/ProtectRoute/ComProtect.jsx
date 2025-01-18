import React, { useContext, useEffect } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Firebase/AuthProvider";
import l from "../../assets/images/loading.gif";
export default function ComProtect({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <img className="mx-auto max-w-[300px]" src={l} alt="" />;
  }
  if (!user)
    return <Navigate to="/login" state={{ his: location?.state?.his }} />;
  if (user) {
    return children;
  }
}
