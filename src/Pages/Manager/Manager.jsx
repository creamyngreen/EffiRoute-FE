import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarManager from "../../Components/NavBarManager/NavBarManager";
import filter from "../../assets/Admin/filter.png";
import reset from "../../assets/Admin/reset.png";

const Manager = () => {
  const navigate = useNavigate();

  // Sample data for procurement plans
  const [procurementPlans, setProcurementPlans] = useState([
    {
      id: "PP-1",
      demand: "Office Supplies",
      priority: "Medium",
      deadline: "2024-11-01",
      destination: "Headquarters",
      status: "Pending",
    },
    {
      id: "PP-2",
      demand: "New Laptops",
      priority: "High",
      deadline: "2024-11-05",
      destination: "Branch Office",
      status: "Pending",
    },
    {
      id: "PP-3",
      demand: "Furniture",
      priority: "Low",
      deadline: "2024-12-01",
      destination: "Warehouse",
      status: "Pending",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("");

  const handleApprove = (id) => {
    setProcurementPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, status: "Approved" } : plan
      )
    );
  };

  const handleReject = (id) => {
    setProcurementPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, status: "Rejected" } : plan
      )
    );
  };

  const handleFilterReset = () => {
    setFilterStatus("");
  };

  // Filtered procurement plans based on selected status
  const filteredPlans = procurementPlans.filter((plan) => {
    return filterStatus ? plan.status === filterStatus : true;
  });

  return (
    <div>
      <NavBarManager />
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Procurement Plans Management
        </h2>

        {/* Filter Section */}
        <div className="my-4">
          <div className="flex items-center mb-2">
            <img src={filter} alt="Filter" className="w-5 h-5 mr-2" />
            <span className="mx-10 font-medium">Filter By Status</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
            <button
              onClick={handleFilterReset}
              className="ml-4 text-red-500 px-4 py-2 rounded-lg flex items-center"
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
        <div className="overflow-x-auto mb-6">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border text-left font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-2 px-4 border text-left font-semibold text-gray-700">
                  DEMAND
                </th>
                <th className="py-2 px-4 border text-left font-semibold text-gray-700">
                  PRIORITY
                </th>
                <th className="py-2 px-4 border text-left font-semibold text-gray-700">
                  DEADLINE
                </th>
                <th className="py-2 px-4 border text-left font-semibold text-gray-700">
                  DESTINATION
                </th>
                <th className="py-2 px-4 border text-left font-semibold text-gray-700">
                  STATUS
                </th>
                <th className="py-2 px-4 border text-left font-semibold text-gray-700">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="text-gray-700 hover:bg-gray-50">
                  <td className="py-2 px-4 border">{plan.id}</td>
                  <td className="py-2 px-4 border">{plan.demand}</td>
                  <td className="py-2 px-4 border">{plan.priority}</td>
                  <td className="py-2 px-4 border">{plan.deadline}</td>
                  <td className="py-2 px-4 border">{plan.destination}</td>
                  <td className="py-2 px-4 border">{plan.status}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleApprove(plan.id)}
                      className="text-green-500 hover:underline mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(plan.id)}
                      className="text-red-500 hover:underline"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Charts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-300 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Transport Units Over Time</h4>
              {/* Placeholder for Chart */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                Chart Placeholder
              </div>
            </div>
            <div className="p-4 border border-gray-300 rounded-lg shadow">
              <h4 className="font-semibold mb-2">Amount Shipped Over Time</h4>
              {/* Placeholder for Chart */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                Chart Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;
