import React from 'react';
import Logo from '../../assets/Logo/Logo.png';

const Navbar = () => {
return (
<nav className="bg-white py-4">
    <div className="container flex justify-between items-center">

    <div className="flex items-center ml-10">
        <img src={Logo} alt="EffiRoute Logo" className="h-8 w-8 mr-2" /> 
        <span className="text-[#56C074] font-bold text-xl font-sora">EffiRoute</span>
    </div>

    <div className="flex space-x-10 ml-auto"> 
        <a href="/solution" className="text-gray-800 hover:text-[#3596FF] font-noto">Solution</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto">Services</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto">Why choose us</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto">News</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto">Pricing</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto">Sign In</a>
    </div>
    </div>
</nav>
);
};

export default Navbar;
