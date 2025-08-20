import { Outlet, Navigate } from "react-router";
import Cookies from "js-cookie";

const PrivateRoutes = () => {

  const token = Cookies.get("token"); // Retrieve the token from cookies
  return token ? <Outlet /> : <Navigate to="/" />
};

export default PrivateRoutes;