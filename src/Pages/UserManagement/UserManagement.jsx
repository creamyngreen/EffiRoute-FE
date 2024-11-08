import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";

const UserManagement = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [memberInfo, setMemberInfo] = useState({
    email: "vipboy20031408@gmail.com",
    password: "********",
    name: "Nguyen Toan Khang",
    phone: "0123456789",
    marketingAgreement: true,
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "EffiRoute",
    registrationNumber: "",
    sector: "Route Optimization",
  });

  const [isEditingCompany, setIsEditingCompany] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Logic to save changes (e.g., API call)
    setIsEditing(false);
  };

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveCompanyChanges = () => {
    // Logic to save changes (e.g., API call)
    setIsEditingCompany(false);
  };

  return (
    <>
      <div className="flex">
        <aside className="w-[20rem] h-screen border p-4 border-r">
          <h3 className="text-lg font-semibold text-gray-400 mb-4">
            Basic Information Management
          </h3>
          <ul className="space-y-2">
            <li className="hover:bg-gray-200 p-2 mb-4 rounded">
              Manage Account Information
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-gray-400 mb-4">
            Manage Payment Information
          </h3>
          <ul className="space-y-2">
            <li className="hover:bg-gray-200 p-2 rounded">
              Payment Management
            </li>
          </ul>
        </aside>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FaUser className="text-primary bg-orange-100 rounded-lg w-10 h-10 p-2 mr-2" />
              <h2 className="text-2xl font-bold">Member Information</h2>
            </div>
            <div className="flex items-center">
              <button
                className="bg-gray-200 text-gray-500 px-4 py-2 rounded hover:bg-gray-300"
                onClick={handleEditToggle}
              >
                {isEditing ? "Cancel" : "Edit information"}
              </button>
              {isEditing && (
                <button
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600 ml-2"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
          <div className="mb-6 border p-4 rounded">
            <div className="grid grid-cols-2 gap-1">
              <p className=" p-2 mb-2">Email</p>
              <p className=" p-2 mb-2 font-bold">{memberInfo.email}</p>

              <p className=" p-2 mb-2">Password</p>
              {isEditing ? (
                <div className="p-1 rounded w-full h-10 flex items-center ">
                  <span className="ml-2 text-gray-500 font-bold">
                    Email verification is required to reset your password.
                  </span>
                  <button className="ml-2 text-primary font-bold  rounded-md p-1 bg-orange-50 hover:bg-primary hover:text-white">
                    Send verification email
                  </button>
                </div>
              ) : (
                <p className="p-2 mb-2 font-bold">{memberInfo.password}</p>
              )}

              <p className=" p-2 mb-2">Name</p>
              {isEditing ? (
                <div className="border p-1 rounded w-full h-10 flex items-center justify-center">
                  <input
                    type="text"
                    name="name"
                    value={memberInfo.name}
                    onChange={handleInputChange}
                    className="w-full h-full p-1 font-bold"
                  />
                </div>
              ) : (
                <p className=" p-2 mb-2 font-bold">{memberInfo.name}</p>
              )}

              <p className=" p-2 mb-2">Phone number</p>
              {isEditing ? (
                <div className="border p-1 rounded w-full h-10 flex items-center justify-center">
                  <input
                    type="text"
                    name="phone"
                    value={memberInfo.phone}
                    onChange={handleInputChange}
                    className="w-full h-full p-1 font-bold"
                  />
                </div>
              ) : (
                <p className=" p-2 mb-2 font-bold">{memberInfo.phone}</p>
              )}

              <p className=" p-2 mb-2">Receive marketing information</p>
              <p className="p-2 font-bold">
                {isEditing ? (
                  <input
                    type="checkbox"
                    name="marketingAgreement"
                    checked={memberInfo.marketingAgreement}
                    onChange={() =>
                      setMemberInfo((prev) => ({
                        ...prev,
                        marketingAgreement: !prev.marketingAgreement,
                      }))
                    }
                  />
                ) : memberInfo.marketingAgreement ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <IoIosBusiness className="text-green-500 bg-green-100 rounded-lg w-10 h-10 p-2 mr-2" />
              <h2 className="text-2xl font-bold">Company Information</h2>
            </div>
            <div className="flex items-center">
              <button
                className="bg-gray-200 text-gray-500 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setIsEditingCompany(!isEditingCompany)}
              >
                {isEditingCompany ? "Cancel" : "Edit information"}
              </button>
              {isEditingCompany && (
                <button
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600 ml-2"
                  onClick={handleSaveCompanyChanges}
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
          <div className="mb-6 border p-4 rounded">
            <div className="grid grid-cols-2 gap-1">
              <p className=" p-2 mb-2">Company name</p>
              {isEditingCompany ? (
                <div className="border p-1 rounded w-full h-10 flex items-center justify-center">
                  <input
                    type="text"
                    name="companyName"
                    value={companyInfo.companyName}
                    onChange={handleCompanyInputChange}
                    className="w-full h-full p-1 font-bold"
                  />
                </div>
              ) : (
                <p className=" p-2 mb-2 font-bold">{companyInfo.companyName}</p>
              )}

              <p className=" p-2 mb-2">Business registration number</p>
              {isEditingCompany ? (
                <div className="border p-1 rounded w-full h-10 flex items-center justify-center">
                  <input
                    type="text"
                    name="registrationNumber"
                    value={companyInfo.registrationNumber}
                    onChange={handleCompanyInputChange}
                    className="w-full h-full p-1 font-bold"
                  />
                </div>
              ) : (
                <p className=" p-2 mb-2 font-bold">
                  {companyInfo.registrationNumber}
                </p>
              )}

              <p className=" p-2 mb-2">Industrial sector</p>
              {isEditingCompany ? (
                <div className="border p-1 rounded w-full h-10 flex items-center justify-center">
                  <input
                    type="text"
                    name="sector"
                    value={companyInfo.sector}
                    onChange={handleCompanyInputChange}
                    className="w-full h-full p-1 font-bold"
                  />
                </div>
              ) : (
                <p className=" p-2 mb-2 font-bold">{companyInfo.sector}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
