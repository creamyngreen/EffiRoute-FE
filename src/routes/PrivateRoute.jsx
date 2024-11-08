/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
// import { useEffect } from "react";
import { Navigate } from "react-router-dom";
// import { doGetAccount } from "../redux/action/accountAction";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const user = useSelector((state) => state.account.userInfo);
  const userRole = user?.roleWithPermission?.name?.toLowerCase();
  // const dispatch = useDispatch();
  // const location = useLocation();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     if (!user || !user.access_token) {
  //       try {
  //         await dispatch(doGetAccount());
  //       } catch (error) {
  //         console.log(error);
  //         window.location.href = `${
  //           import.meta.env.VITE_BACKEND_SSO
  //         }?serviceURL=${import.meta.env.VITE_SERVICE_URL}${location.pathname}`;
  //       }
  //     }
  //   };

  //   checkAuth();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!user || !user.access_token) {
    return null;
  }

  // Check if user's role is allowed to access this route
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default PrivateRoute;
