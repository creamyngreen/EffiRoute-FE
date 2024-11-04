import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { doGetAccount } from "../redux/action/accountAction";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.account.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && !user.access_token) {
      dispatch(doGetAccount());
    }
  }, [user, dispatch]);

  if (user && user.access_token) {
    return children;
  } else {
    window.location.href = `${import.meta.env.VITE_BACKEND_SSO}?serviceURL=${
      import.meta.env.VITE_CURRENT_URL
    }`;
    return null;
  }
};

export default PrivateRoute;
