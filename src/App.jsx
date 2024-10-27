import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AppRoute from "./routes/AppRoute";
import Footer from "./Components/Footer/Footer";

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
  ];
  const hideFooterPaths = [
    "/admin",
    "/account",
    "/supplier",
    "/planner",
    "/order",
    "/manager",
  ];
  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      {children}
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <AppRoute />
      </AppLayout>
    </Router>
  );
}

export default App;
