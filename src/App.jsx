import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AppRoute from './routes/AppRoute';
import Footer from './Components/Footer/Footer';


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
        <AppRoute/>
          
        
      </AppLayout>
    </Router>
  );
}

export default App;
