import React from "react";
import searchIcon from "../../assets/Admin/search.png";
import menuIcon from "../../assets/Admin/menu.png";
import notificationIcon from "../../assets/Admin/notification.png";
import user from "../../assets/Admin/user.png";
import face2 from "../../assets/Home/WhyChooseUs/face2.png";
import arrowdown from "../../assets/Admin/arrowdown.png";
const TopSearchBar = () => {
return (
<div className="flex items-center justify-between w-full p-4 font-nunito">
    {/* Left side*/}
    <div className="flex items-center space-x-4">
        {/* Menu Icon */}
        <img src={menuIcon} alt="Menu" className="w-6 h-6 cursor-pointer" />

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full border-2 border-[#D5D5D5] px-4 py-2 w-[70rem]">
            <img src={searchIcon} alt="Search" className="w-4 h-4 mr-2" />
            <input
            type="text"
            className="bg-transparent focus:outline-none w-full"
            placeholder="Search"
            />
        </div>
    </div>

    {/* Right side */}
    <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative">
            <img src={notificationIcon} alt="Notification" className="w-8 h-8 cursor-pointer" />
            {/* Notification Badge */}
            <div className="absolute -top-2 -right-1.5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            6
            </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
            <img
            src={face2} 
            alt="Profile"
            className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col items-start">
                <span className="text-base font-bold">Ellon Musk</span>
                <span className="text-sm text-gray-500">Admin</span>
            </div>
            <img src={arrowdown} alt="Arrow Down" className="w-5 h-5 cursor-pointer border-2 border-gray-300 rounded-full" />
        </div>
    </div>
</div>
);
};

export default TopSearchBar;
