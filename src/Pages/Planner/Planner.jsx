import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import reset from "../../assets/Admin/reset.png";
import arrowdown from "../../assets/Admin/arrowdown.png";
import filter from "../../assets/Admin/filter.png";
const Planner = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [procurementPlans, setProcurementPlans] = useState([]);
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [planDetails, setPlanDetails] = useState({
    id: `PP-${Date.now()}`,
    demand: "",
    priority: "Medium",
    deadline: "",
    destination: "",
  });

  const [showPriorityFilters, setShowPriorityFilters] = useState(false); // State for priority filter visibility
  const [showStatusFilters, setShowStatusFilters] = useState(false); // State for status filter visibility

  const handleInputChange = (e) => {
    setPlanDetails({ ...planDetails, [e.target.name]: e.target.value });
  };

  const handleAddPlan = () => {
    setProcurementPlans([...procurementPlans, planDetails]);
    setPlanDetails({
      id: `PP-${Date.now()}`,
      demand: "",
      priority: "Medium",
      deadline: "",
      destination: "",
    });
  };

  const handleUploadCSV = () => {
    console.log("CSV data uploaded and auto-filled!");
  };

  const handleNext = () => {
    navigate("/order"); // Navigate to the Order page
  };

  const handleView = (planId) => {
    navigate("/order", { state: { planId } });
  };

  const handleFilterReset = () => {
    setFilterPriority("");
    setFilterStatus("");
    setShowPriorityFilters(false); // Close priority filters
    setShowStatusFilters(false); // Close status filters
  };

  // Filtered procurement plans based on selected filters
  const filteredPlans = procurementPlans.filter((plan) => {
    const matchesPriority = filterPriority
      ? plan.priority === filterPriority
      : true;
    const matchesStatus = filterStatus ? plan.status === filterStatus : true; // Assuming status is defined
    return matchesPriority && matchesStatus;
  });

  return (
    <div>
      <NavBarPlanner />
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Create Procurement Plan
        </h2>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
          <div className="flex items-center">
            <button
              onClick={handleUploadCSV}
              className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Upload CSV
            </button>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddPlan}
          className="px-4 py-2 mb-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none"
        >
          Add Plan
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="px-6 py-2 ml-[105.7rem] bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Next
        </button>

        {/* Filter Section */}
        <div className="my-4">
          <div className="flex items-center mb-2">
            <img src={filter} alt="Filter" className="w-5 h-5 mr-2" />
            <span className="mx-10 font-medium">Filter By</span>
            <div className="flex items-center mr-4">
              <span className=" font-medium text-gray-700 mr-2">Priority</span>
              <button
                onClick={() => setShowPriorityFilters(!showPriorityFilters)} // Toggle priority filter dropdown
                className="flex items-center"
              >
                <img
                  src={arrowdown}
                  alt="Arrow Down"
                  className="inline-block w-4 h-4"
                />
              </button>
            </div>
            {showPriorityFilters && ( // Conditional rendering for priority dropdown
              <div className="flex items-center mr-4 mt-2">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            )}
            <div className="flex items-center mr-4">
              <span className="font-medium text-gray-700 mr-2">Status</span>
              <button
                onClick={() => setShowStatusFilters(!showStatusFilters)} // Toggle status filter dropdown
                className="flex items-center"
              >
                <img
                  src={arrowdown}
                  alt="Arrow Down"
                  className="inline-block w-4 h-4"
                />
              </button>
            </div>
            {showStatusFilters && ( // Conditional rendering for status dropdown
              <div className="flex items-center mr-4 mt-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            )}
            <button
              onClick={handleFilterReset}
              className="text-red-500 px-4 py-2 rounded-lg flex items-center"
            >
              <img
                src={reset}
                alt="Reset"
                className="inline-block w-4 h-4 mr-1"
              />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Procurement Plans Table */}
        <h3 className="text-xl font-semibold mb-2 text-gray-700">
          Procurement Plan Status
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Demand</th>
                <th className="py-2 px-4 border-b text-left">Priority</th>
                <th className="py-2 px-4 border-b text-left">Deadline</th>
                <th className="py-2 px-4 border-b text-left">Destination</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-4 border-b">{plan.id}</td>
                  <td className="py-2 px-4 border-b">{plan.demand}</td>
                  <td className="py-2 px-4 border-b">{plan.priority}</td>
                  <td className="py-2 px-4 border-b">{plan.deadline}</td>
                  <td className="py-2 px-4 border-b">{plan.destination}</td>
                  <td className="py-2 px-4 border-b">Pending</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleView(plan.id)}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Planner;
