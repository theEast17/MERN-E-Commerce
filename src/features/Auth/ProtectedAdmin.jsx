import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./authSlice";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserInfoById } from "../User/userSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectLoggedInUserInfoById)

  if (!user) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  if (userInfo && userInfo.role!=='admin') {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedAdmin;
