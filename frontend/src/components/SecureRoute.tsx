import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function SecureRoute() {
  const { currentUser } = useSelector((state: any) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}
