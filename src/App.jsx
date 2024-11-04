import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { HashLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccount } from "./redux/action/accountAction";
import { useRef, useEffect } from "react";
import AppRoute from "./routes/AppRoute";
// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
  const location = useLocation();

  const hideNavbarPaths = [
    "/login",
    "/verify-code",
    "/forgot-password",
    "/reset-password",
    "/admin",
    "/account",
    "/supplier",
    "/planner",
    "/order",
    "/manager",
    "/monitor",
  ];
  const hideFooterPaths = [
    "/admin",
    "/account",
    "/supplier",
    "/planner",
    "/order",
    "/manager",
    "/monitor",
  ];

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {children}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);
  const user = useSelector((state) => state.account.userInfo);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (user && !user.access_token) {
      dispatch(doGetAccount());
    }
    firstRenderRef.current = false;
  }, [dispatch, user]);

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Router>
      {isLoading ? (
        <div style={style}>
          <HashLoader color={"#fd7e14"} loading={true} size={150} />
        </div>
      ) : (
        firstRenderRef.current === false && (
          <AppLayout>
            <AppRoute />
          </AppLayout>
        )
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
};

export default App;
