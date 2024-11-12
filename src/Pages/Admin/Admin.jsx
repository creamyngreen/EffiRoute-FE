import React from "react";
import NavBarAdmin from "../../Components/NavBarAdmin/NavBarAdmin";
import SideBarAdmin from "../../Components/SidebarAdmin/SidebarAdmin";

const Admin = () => {
  return (
    <div className="flex h-screen font-nunito">
      <SideBarAdmin />  
      {/* Main content*/}
      <div className="flex-1 flex flex-col">
        <NavBarAdmin />
      </div>
    </div>
  );
};

export default Admin;
