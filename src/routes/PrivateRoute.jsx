/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { doGetAccount } from "../redux/action/accountAction";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const user = useSelector((state) => state.account.userInfo);
  const userRole = user?.roleWithPermission?.name?.toLowerCase();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      if (!user || !user.access_token) {
        try {
          await dispatch(doGetAccount());
        } catch (error) {
          window.location.href = `${
            import.meta.env.VITE_BACKEND_SSO
          }?serviceURL=${import.meta.env.VITE_SERVICE_URL}${location.pathname}`;
        }
      }
    };

    checkAuth();
  }, [dispatch, user, location.pathname]);

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
