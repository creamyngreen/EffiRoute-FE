import LoginPage from "../Pages/LoginPage/LoginPage";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import { Routes, Route } from "react-router-dom";
import VerifyCode from "../Pages/VerifyCode/VerifyCode";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import Home from "../Pages/Home/Home";
import Admin from "../Pages/Admin/Admin";
import AccountManagement from "../Pages/AccountManagement/AccountManagement";
import Supplier from "../Pages/Supplier/Supplier";
import LoginWithSSO from "../Components/LoginWithSSO/LoginWithSSO";
import PrivateRoute from "./PrivateRoute";
const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <AccountManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route
        path="/supplier"
        element={
          <PrivateRoute>
            <Supplier />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/code" element={<LoginWithSSO />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoute;
