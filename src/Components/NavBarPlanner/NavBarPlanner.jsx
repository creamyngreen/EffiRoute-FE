import React, { useState } from "react";
import Logo from "../../assets/Home/Logo/Logo.png";
import face2 from "../../assets/Home/WhyChooseUs/face2.png";

function NavBarPlanner() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border-gray-200 border-b-2">
      <div className="max-w-screen-3xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={Logo} className="h-12" alt="Logo" />
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
            id="user-menu-button"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <span className="sr-only">Open user menu</span>
            <div className="flex items-end justify-end">
              <img
                className="w-10 h-10 rounded-full"
                src={face2}
                alt="User photo"
              />
            </div>
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-12 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow ">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 ">Khang</span>
                <span className="block text-sm text-gray-500 truncate ">
                  123name@gmail.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* <div
          className="items-center justify-between hidden text-xl w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
                aria-current="page"
              >
                Procurement Plan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
              >
                Monitor
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
}

export default NavBarPlanner;
