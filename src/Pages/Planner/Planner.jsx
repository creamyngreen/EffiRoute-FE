import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import reset from "../../assets/Admin/reset.png";
import arrowdown from "../../assets/Admin/arrowdown.png";
import filter from "../../assets/Admin/filter.png";

const Planner = () => {
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600";
      case "Completed":
        return "text-green-600";
      case "Rejected":
        return "text-red-600";
      case "Approved":
        return "text-blue-600";
      default:
        return "";
    }
  };
  // Initial dummy data for procurement plans
  const [procurementPlans, setProcurementPlans] = useState([
    {
      id: "PP-101",
      demand: "1000 units",
      priority: "High",
      deadline: "2024-12-10",
      destination: "Warehouse A",
      supplier: "Supplier X",
      transportation: "Air Freight",
      dateCreated: "2024-10-15",
      status: "Pending",
    },
    {
      id: "PP-102",
      demand: "500 units",
      priority: "Medium",
      deadline: "2024-11-05",
      destination: "Warehouse B",
      supplier: "Supplier Y",
      transportation: "Sea Freight",
      dateCreated: "2024-10-18",
      status: "Completed",
    },
    {
      id: "PP-103",
      demand: "300 units",
      priority: "Low",
      deadline: "2024-12-01",
      destination: "Warehouse C",
      supplier: "Supplier Z",
      transportation: "Truck",
      dateCreated: "2024-10-20",
      status: "Rejected",
    },  
  ]);

  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showPriorityFilters, setShowPriorityFilters] = useState(false);
  const [showStatusFilters, setShowStatusFilters] = useState(false);

  const [planDetails, setPlanDetails] = useState({
    id: `PP-${Date.now()}`,
    demand: "",
    priority: "Medium",
    deadline: "",
    destination: "",
    supplier: "",
    transportation: "",
  });

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
      supplier: "",
      transportation: "",
    });
  };

  const handleUploadCSV = () => {
    console.log("CSV data uploaded and auto-filled!");
  };

  const handleNext = () => {
    navigate("/order");
  };

  const handleFilterReset = () => {
    setFilterPriority("");
    setFilterStatus("");
    setShowPriorityFilters(false);
    setShowStatusFilters(false);
  };

  // Filter procurement plans based on selected filters
  const filteredPlans = procurementPlans.filter((plan) => {
    const matchesPriority = filterPriority
      ? plan.priority === filterPriority
      : true;
    const matchesStatus = filterStatus ? plan.status === filterStatus : true;
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
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Supplier
            </label>
            <select
              name="supplier"
              value={planDetails.supplier}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="Supplier X">Supplier X</option>
              <option value="Supplier Y">Supplier Y</option>
              <option value="Supplier Z">Supplier Z</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Transportation
            </label>
            <select
              name="transportation"
              value={planDetails.transportation}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="Air Freight">Air Freight</option>
              <option value="Sea Freight">Sea Freight</option>
              <option value="Truck">Truck</option>
            </select>
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
                onClick={() => setShowPriorityFilters(!showPriorityFilters)}
                className="flex items-center"
              >
                <img
                  src={arrowdown}
                  alt="Arrow Down"
                  className="inline-block w-4 h-4"
                />
              </button>
            </div>
            {showPriorityFilters && (
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
                onClick={() => setShowStatusFilters(!showStatusFilters)}
                className="flex items-center"
              >
                <img
                  src={arrowdown}
                  alt="Arrow Down"
                  className="inline-block w-4 h-4"
                />
              </button>
            </div>
            {showStatusFilters && (
              <div className="flex items-center mr-4 mt-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            )}
            <img
              src={reset}
              alt="Reset Filter"
              className="w-4 h-4 cursor-pointer ml-4"
              onClick={handleFilterReset}
            />
          </div>
        </div>

        {/* Procurement Plans Table */}
        <table className="w-full mt-4 table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left font-semibold text-gray-700">
                ID
              </th>
              <th className="border p-2 text-left font-semibold text-gray-700">
                DEMAND
              </th>
              <th className="border p-2 text-left font-semibold text-gray-700">
                PRIORITY
              </th>
              <th className="border p-2 text-left font-semibold text-gray-700">
                DEADLINE
              </th>
              <th className="border p-2 text-left font-semibold text-gray-700">
                DESTINATION
              </th>
              <th className="border p-2 text-left font-semibold text-gray-700">
                SUPPLIER
              </th>
              <th className="border p-2 text-left font-semibold text-gray-700">
                TRANSPORTATION
              </th>
              <th className="border p-2 text-left font-semibold text-gray-700">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="border p-2 text-gray-800">{plan.id}</td>
                <td className="border p-2 text-gray-800">{plan.demand}</td>
                <td className="border p-2 text-gray-800">{plan.priority}</td>
                <td className="border p-2 text-gray-800">{plan.deadline}</td>
                <td className="border p-2 text-gray-800">{plan.destination}</td>
                <td className="border p-2 text-gray-800">{plan.supplier}</td>
                <td className="border p-2 text-gray-800">
                  {plan.transportation}
                </td>
                <td className={`border p-2 ${getStatusColor(plan.status)}`}>
                  {plan.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Planner;
