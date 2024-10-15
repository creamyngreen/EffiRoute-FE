import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';
import LoginPage from './Pages/LoginPage/LoginPage';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'; 
import VerifyCode from './Pages/VerifyCode/VerifyCode'; 
import ResetPassword from './Pages/ResetPassword/ResetPassword'; 

const AppLayout = ({ children }) => {
    const location = useLocation();
    const hideNavbarPaths = ['/login', '/verify-code', '/forgot-password','/reset-password'];
    
    return (
        <>
            {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
            {children}
            <Footer />
        </>
    );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
