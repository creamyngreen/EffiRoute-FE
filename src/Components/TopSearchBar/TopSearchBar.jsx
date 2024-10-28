import React, { useState } from "react";
import searchIcon from "../../assets/Admin/search.png";
import menuIcon from "../../assets/Admin/menu.png";
import notificationIcon from "../../assets/Planner/noti.png"; // Update the notification icon import if needed
import face2 from "../../assets/Home/WhyChooseUs/face2.png";
import { useSelector } from "react-redux";

const TopSearchBar = () => {
  const user = useSelector((state) => state.account.account);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        {/* Notification Button */}
        <button
          type="button"
          className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-neutral-800 focus:ring-2 focus:outline-none focus:ring-neutral-700"
        >
          <img
            src={notificationIcon}
            alt="Notifications"
            className="w-7 h-7 filter invert contrast-200 brightness-200"
          />
          <span className="sr-only">Notifications</span>
          {/* Notification Badge */}
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
            6
          </div>
        </button>

        {/* Profile Button and Dropdown */}
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-14 h-14 rounded-full"
            src={face2}
            alt="User photo"
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-14 right-5 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow">
            <div className="px-4 py-3">
              {user && user.access_token ? (
                <>
                  <span className="block text-sm text-gray-900">
                    {user.username}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {user.roles.name}
                  </span>
                </>
              ) : (
                <>
                  <span className="block text-sm text-gray-900">Admin</span>
                  <span className="block text-sm text-gray-500">
                    21522195@gm.uit.edu.vn
                  </span>
                </>
              )}
            </div>
            <ul className="py-2">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSearchBar;
