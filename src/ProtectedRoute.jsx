import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("Token"); // Token check

  return token ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
