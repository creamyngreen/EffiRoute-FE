import React, { useState } from "react";
import NavBarManager from "../../Components/NavBarManager/NavBarManager";
import { Table, Button } from "antd";
import { RiExpandUpDownFill } from "react-icons/ri";

// Function to get status tag
const getStatusTag = (status) => {
  switch (status) {
    case "Completed":
      return (
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
          Completed
        </span>
      );
    case "Approved":
      return (
        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
          Approved
        </span>
      );
    case "Draft":
      return (
        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
          Draft
        </span>
      );
    case "Rejected":
      return (
        <span className="bg-red-200 text-red-800 px-2 py-1 rounded">
          Rejected
        </span>
      );
    case "Pending":
      return (
        <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
          Pending
        </span>
      );
    default:
      return status;
  }
};

// Function to get priority tag
const getPriorityTag = (priority) => {
  switch (priority) {
    case "High":
      return (
        <span className="bg-red-200 text-red-800 px-2 py-1 rounded">High</span>
      );
    case "Low":
      return (
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
          Low
        </span>
      );
    default:
      return priority;
  }
};

// Sample data for the summary table
const initialDataSource = Array.from({ length: 50 }).map((_, i) => ({
  key: i,
  id: `ID-${i}`,
  demand: `Demand ${i} tons`,
  destination: `Destination ${i}`,
  createdDate: `2023-11-${(i % 30) + 1}`,
  deadline: `2023-12-${(i % 30) + 1}`,
  status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Rejected" : "Pending",
  priority: i % 2 === 0 ? "High" : "Low",
}));

const Manager = () => {
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Demand",
      dataIndex: "demand",
    },
    {
      title: "Destination",
      dataIndex: "destination",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      render: (text) => getPriorityTag(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => getStatusTag(text),
    },
    {
      title: "Action",
      render: (text, record) => (
        <div>
          <Button 
            type="primary" 
            onClick={() => handleStatusChange(record.key, "Approved")}
          >
            Approve
          </Button>
          <Button
            type="danger"
            className="border-gray-200 ml-4"
            onClick={() => handleStatusChange(record.key, "Rejected")}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  // Calculate summary counts
  const totalPlans = dataSource.length;

  const limitedDataSource =
    rowsToDisplay === "all"
      ? dataSource
      : dataSource.slice(
          (currentPage - 1) * rowsToDisplay,
          currentPage * rowsToDisplay
        );

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // Function to handle status change
  const handleStatusChange = (key, newStatus) => {
    setDataSource((prevData) => 
      prevData.map((item) => 
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div>
      <NavBarManager />
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Procurement Plans Management
        </h2>

        {/* Plan Summary Section */}
        <div className="flex space-x-4 items-center mb-4">
          <span>Selected Plans: {selectedRowKeys.length}</span>
          <span className="text-gray-400">|</span>
          <span>Total Plans: {totalPlans}</span>
          <div className="relative inline-flex items-center">
            <select
              className="border border-gray-300 text-sm px-4 py-2 pr-8 rounded-md focus:outline-none appearance-none"
              onChange={(e) => {
                const value = e.target.value;
                setRowsToDisplay(value);
                setCurrentPage(1); 
              }}
            >
              <option value="all">View All</option>
              <option value={10}>View 10 at a time</option>
              <option value={20}>View 20 at a time</option>
              <option value={30}>View 30 at a time</option>
              <option value={40}>View 40 at a time</option>
              <option value={50}>View 50 at a time</option>
            </select>
            <RiExpandUpDownFill className="absolute right-2 pointer-events-none text-gray-500" />
          </div>
        </div>

        {/* Plan Summary Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={limitedDataSource} 
          pagination={{
            current: currentPage,
            pageSize: rowsToDisplay === "all" ? totalPlans : rowsToDisplay,
            total: totalPlans,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false, 
          }} 
        />
      </div>
    </div>
  );
};

export default Manager;
