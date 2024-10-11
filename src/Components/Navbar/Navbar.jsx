import React from 'react';
import Logo from '../../assets/Logo/Logo.png';

const Navbar = () => {
return (
<nav className="bg-white py-4">
    <div className="flex justify-between items-center">

    <div className="flex items-center ml-10">
        <img src={Logo} alt="EffiRoute Logo" className="h-10 w-auto mr-2 mb-5" /> 
        <span className="text-[#56C074] font-bold text-3xl font-sora">EffiRoute</span>
    </div>

    <div className="flex justify-items-end space-x-20 mr-12"> 
        <a href="/solution" className="text-gray-800 hover:text-[#3596FF] font-noto text-xl">Solution</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto text-xl">Services</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto text-xl">Why choose us</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto text-xl">News</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto text-xl">Pricing</a>
        <a href="#" className="text-gray-800 hover:text-[#3596FF] font-noto text-xl">Sign In</a>
    </div>
    </div>
</nav>
);
};

export default Navbar;
