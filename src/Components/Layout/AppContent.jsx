/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { doGetAccount } from "../../redux/action/accountAction";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import AppRoute from "../../routes/AppRoute";

const AppContent = ({ firstRenderRef }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.userInfo);

  const protectedPaths = [
    "/admin",
    "/account",
    "/supplier",
    "/planner",
    "/optimization",
    "/manager",
    "/monitor",
    "/users",
    "/manageaccount",
  ];

  useEffect(() => {
    const checkAuth = async () => {
      if (protectedPaths.includes(location.pathname)) {
        if (firstRenderRef.current) {
          dispatch(doGetAccount());
          firstRenderRef.current = false;
        } else if (!user || !user.access_token) {
          dispatch(doGetAccount());
        }
      } else {
        firstRenderRef.current = false;
      }
    };

    checkAuth();
  }, [location.pathname, dispatch, user, protectedPaths]);

  const hideNavbarPaths = [
    "/login",
    "/verify-code",
    "/forgot-password",
    "/reset-password",
    "/404",
    ...protectedPaths,
  ];

  const hideFooterPaths = [...protectedPaths];

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <AppRoute />
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default AppContent;
