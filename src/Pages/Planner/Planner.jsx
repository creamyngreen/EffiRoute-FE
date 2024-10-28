import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import ProgressStep from "../../Components/ProgressStep/ProgressStep";
import { FaUpload, FaPlus } from "react-icons/fa";

const Planner = () => {
  const navigate = useNavigate();

  const [planDetails, setPlanDetails] = useState({
    id: `PP-${Date.now()}`,
    demand: "",
    priority: "Medium",
    deadline: "",
    destination: "",
  });

  const handleInputChange = (e) => {
    setPlanDetails({ ...planDetails, [e.target.name]: e.target.value });
  };

  const handleAddPlan = () => {
    console.log("Adding plan:", planDetails);
    setPlanDetails({
      id: `PP-${Date.now()}`,
      demand: "",
      priority: "Medium",
      deadline: "",
      destination: "",
    });
    navigate("/order");
  };

  const handleUploadCSV = () => {
    console.log("CSV data uploaded and auto-filled!");
  };

  return (
    <div>
      <NavBarPlanner />
      <div className="mt-16">
        <ProgressStep currentStep={1} totalSteps={3} />
      </div>

      <div className="flex justify-center mt-8">
        <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">Plan Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                ID
              </label>
              <input
                type="text"
                value={planDetails.id}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Demand
              </label>
              <input
                type="text"
                name="demand"
                value={planDetails.demand}
                onChange={handleInputChange}
                placeholder="Enter demand"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={planDetails.priority}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={planDetails.deadline}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={planDetails.destination}
                onChange={handleInputChange}
                placeholder="Enter destination"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleUploadCSV}
                className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none flex items-center"
              >
                <FaUpload className="mr-2" /> Upload CSV
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleAddPlan}
              className="px-4 py-2 mb-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none flex items-center"
            >
              <FaPlus className="mr-2" /> Add Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
