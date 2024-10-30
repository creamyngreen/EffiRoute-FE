import React, { useState } from "react";
import reset from "../../assets/Admin/reset.png";
import arrowdown from "../../assets/Admin/arrowdown.png";
import filter from "../../assets/Admin/filter.png";
import NavBarPlanner from "../NavBarPlanner/NavBarPlanner";
const ProcurementTable = ({ procurementPlans = [] }) => {
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showPriorityFilters, setShowPriorityFilters] = useState(false);
  const [showStatusFilters, setShowStatusFilters] = useState(false);

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

  const handleFilterReset = () => {
    setFilterPriority("");
    setFilterStatus("");
    setShowPriorityFilters(false);
    setShowStatusFilters(false);
  };

  const filteredPlans = procurementPlans.filter((plan) => {
    const matchesPriority = filterPriority
      ? plan.priority === filterPriority
      : true;
    const matchesStatus = filterStatus ? plan.status === filterStatus : true;
    return matchesPriority && matchesStatus;
  });

  // Dummy data
  const dummyData = [
    {
      id: "PP-001",
      demand: "Office Supplies",
      priority: "High",
      deadline: "2024-11-15",
      destination: "Warehouse A",
      status: "Pending",
    },
    {
      id: "PP-002",
      demand: "IT Equipment",
      priority: "Medium",
      deadline: "2024-11-20",
      destination: "Warehouse B",
      status: "Approved",
    },
    {
      id: "PP-003",
      demand: "Furniture",
      priority: "Low",
      deadline: "2024-11-25",
      destination: "Warehouse C",
      status: "Completed",
    },
    {
      id: "PP-004",
      demand: "Cleaning Supplies",
      priority: "Medium",
      deadline: "2024-11-30",
      destination: "Warehouse D",
      status: "Rejected",
    },
  ];

  return (
    <div>
      <NavBarPlanner />
      <div className="my-8">
      </div>
      {/* Filter Section */}
      <div className="my-4">
        <div className="flex items-center mb-2">
          <img src={filter} alt="Filter" className="w-5 h-5 mr-2" />
          <span className="mx-10 font-medium">Filter By</span>
          <div className="flex items-center mr-4">
            <span className="font-medium text-gray-700 mr-2">Priority</span>
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
                <option value="Rejected">Rejected</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          )}
          <img
            src={reset}
            alt="Reset Filter"
            className="w-4 h-4 cursor-pointer mx-2"
            onClick={handleFilterReset}
          />
          <span className="text-red-500">Reset filter</span>
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full text-center border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Demand</th>
            <th className="border border-gray-300 px-4 py-2">Priority</th>
            <th className="border border-gray-300 px-4 py-2">Deadline</th>
            <th className="border border-gray-300 px-4 py-2">Destination</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlans.length > 0 || procurementPlans.length === 0 ? (
            filteredPlans.length > 0 ? (
              filteredPlans.map((plan) => (
                <tr key={plan.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.demand}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.priority}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.deadline}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.destination}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${getStatusColor(
                      plan.status
                    )}`}
                  >
                    {plan.status || "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              dummyData.map((plan) => (
                <tr key={plan.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.demand}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.priority}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.deadline}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {plan.destination}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${getStatusColor(
                      plan.status
                    )}`}
                  >
                    {plan.status || "Pending"}
                  </td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No procurement plans available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProcurementTable;
