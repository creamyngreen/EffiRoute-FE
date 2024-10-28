import LoginPage from "../Pages/LoginPage/LoginPage";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import { Routes, Route } from "react-router-dom";
import VerifyCode from "../Pages/VerifyCode/VerifyCode";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import Home from "../Pages/Home/Home";
import Admin from "../Pages/Admin/Admin";
import AccountManagement from "../Pages/Admin/AccountManagement/AccountManagement";
import Supplier from "../Pages/Admin/Supplier/Supplier";
import LoginWithSSO from "../Components/LoginWithSSO/LoginWithSSO";
import Planner from "../Pages/Planner/Planner";
import Order from "../Pages/Order/Order";
import Manager from "../Pages/Manager/Manager";
import ProcurementTable from "../Components/ProcurementTable/ProcurementTable";
const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order" element={<Order />} />
        <Route path="/procurement" element={<ProcurementTable />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/account" element={<AccountManagement />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/code" element={<LoginWithSSO />} />
        {/* <PrivateRoute path="/users" component={Users} />
                <PrivateRoute path="/permissions" component={Permission} />
                <PrivateRoute path="/role-permission" component={RolePermission} /> */}
        <Route path="*">404 Not Found</Route>
      </Routes>
    </>
  );
};

export default AppRoute;
