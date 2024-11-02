import React, { useState } from "react";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import { FaPlus } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TiFilter } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { DatePicker, Space, Table } from "antd";
import { RiExpandUpDownFill } from "react-icons/ri";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaFileExcel } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

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

const getPriorityTag = (priority) => {
  switch (priority) {
    case "High":
      return (
        <span className="bg-red-200 text-red-800 px-2 py-1 rounded">High</span>
      );
    case "Medium":
      return (
        <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded">
          Medium
        </span>
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
    title: "Status",
    dataIndex: "status",
    render: (text) => getStatusTag(text),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    render: (text) => getPriorityTag(text),
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
  },
];

// Data source for the table
const dataSource = Array.from({ length: 46 }).map((_, i) => ({
  key: i,
  id: `ID-${i}`, // Example ID
  demand: `Demand ${i}`, // Example Demand
  destination: `Destination ${i}`, // Example Destination
  status:
    i % 4 === 0
      ? "Completed"
      : i % 4 === 1
      ? "Approved"
      : i % 4 === 2
      ? "Rejected"
      : "Pending", // Updated Status
  priority: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low", // Updated Priority
  deadline: `2023-12-${(i % 30) + 1}`, // Example Deadline
  createdDate: `2023-11-${(i % 30) + 1}`, // Example Created Date
}));

const Planner = () => {
  const { RangePicker } = DatePicker;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState(10);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleDateChange = (date, dateString) => {
    console.log("Selected date:", date, dateString);

  };
  const limitedDataSource = dataSource.slice(0, rowsToDisplay);

  const handleRowsChange = (event) => {
    setRowsToDisplay(parseInt(event.target.value, 10));
  };

  const handleAddOneDirectly = () => {
    setIsModalVisible(false);
    setIsSecondModalVisible(true);
  };

  return (
    <div className="min-h-screen">
      <NavBarPlanner />
      <div className="px-6 py-4 bg-white mx-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-orange-500 text-xl font-semibold">
              Automatic Dispatch
            </h1>
            <span className="text-gray-400">|</span>
            <h2 className="text-black text-xl font-bold">
              Manage pending plans
            </h2>
          </div>

          <div className="flex space-x-4">
            <button className="border border-gray-300 text-sm font-bold text-[#8F96A9] px-4 py-2 rounded-md hover:bg-gray-100 flex items-center">
              <FaArrowDown className="mr-2 text-xs" /> Order download
            </button>
            <button
              className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
              onClick={showModal}
            >
              <FaPlus className="mr-2 text-xs" /> Add order
            </button>
          </div>
        </div>

        <p className="text-gray-500 mt-2">
          This page allows you to manage pending plans and check their status.
        </p>
      </div>

      <div className="px-6 py-4 bg-white mx-6 mt-6 ">
        <div className="inline-flex rounded-md shadow-sm mb-4" role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
          >
            View Entire Plans
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
          >
            Manage Pending Plans
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
          >
            Manage Approved Plans
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
          >
            Manage Completed Plans
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
          >
            Manage Rejected Plans
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <form className="w-96">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-[#8F96A9] sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 text-[#8F96A9] flex items-center ps-3 pointer-events-none">
                  <CiSearch />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-[#8F96A9] border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary"
                  placeholder="Please enter your ID plans, destination, etc."
                />
              </div>
            </form>
            <button className="text-[#8F96A9] border border-gray-300 rounded-md px-2 py-2 flex items-center text-sm font-bold">
              <TiFilter className="mr-2" />
              Detailed Filter
            </button>
          </div>
        </div>

        {/* Inquiry Period */}
        <div className="mt-4 flex items-center space-x-4">
          <label className="text-gray-600 flex items-center">
            Inquiry period
            <div className="relative group ml-2">
              <div className="w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center cursor-pointer">
                i
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 hidden group-hover:block bg-white text-primary text-xs rounded py-1 px-2 w-40 border border-gray-300">
                Set the period for which you want to view the plan
              </div>
            </div>
          </label>

          <div className="relative">
            <select className="border border-gray-300 text-sm px-4 py-2 pr-10 rounded-md focus:outline-none appearance-none">
              <option>Planned Date</option>
              <option>Deadline</option>
            </select>
            <RiExpandUpDownFill className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500" />
          </div>

          <div className="inline-flex rounded-md shadow-sm " role="group">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              Today
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              1 Week
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              1 Month
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 rounded-e-lg hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              3 Months
            </button>
          </div>

          {/* Calendar */}
          <Space direction="vertical" size={12}>
            <RangePicker className="h-9 hover:bg-gray-200 focus:ring-primary" />
          </Space>
        </div>

        {/* Plan Status */}
        <div className="mt-4 flex space-x-8">
          <div className="flex items-center space-x-2">
            <label className="text-gray-600 flex items-center">
              Plan Status
              <div className="relative group ml-2">
                <div className="w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center cursor-pointer">
                  i
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 hidden group-hover:block bg-white text-primary text-xs rounded py-1 px-2 w-40 border border-gray-300">
                  This is a plan status filter
                </div>
              </div>
            </label>
          </div>
          <div className="inline-flex rounded-md shadow-sm " role="group">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              Pending
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              Approved
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              Rejected
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 rounded-e-lg hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              Completed
            </button>
          </div>
        </div>
        {/* Plan Priority */}
        <div className="mt-4 flex space-x-8">
          <div className="flex items-center space-x-2">
            <label className="text-gray-600 flex items-center">
              Plan Priority
              <div className="relative group ml-2">
                <div className="w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center cursor-pointer">
                  i
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 hidden group-hover:block bg-white text-primary text-xs rounded py-1 px-2 w-40 border border-gray-300">
                  This is a plan priority filter
                </div>
              </div>
            </label>
          </div>
          <div className="inline-flex rounded-md shadow-sm " role="group">
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              Low
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              Medium
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 rounded-e-lg hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
            >
              High
            </button>
          </div>
        </div>

        {/* Plans Summary */}
        <div className="flex justify-between items-center mt-10 mb-5 text-gray-600">
          <div className="flex space-x-4 items-center">
            <span>Selected Orders: 00</span>
            <span className="text-gray-400">|</span>
            <span>Total Orders: 00</span>
            <div className="relative inline-flex items-center">
              <select
                className="border border-gray-300 text-sm px-4 py-2 pr-8 rounded-md focus:outline-none appearance-none"
                onChange={handleRowsChange}
              >
                <option value={10}>View 10 at a time</option>
                <option value={20}>View 20 at a time</option>
                <option value={30}>View 30 at a time</option>
                <option value={40}>View 40 at a time</option>
                <option value={50}>View 50 at a time</option>
              </select>
              <RiExpandUpDownFill className="absolute right-2 pointer-events-none text-gray-500" />
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="bg-orange-50 text-primary font-bold  px-4 py-2 rounded-md hover:bg-primary hover:text-white ">
              Optimize Based on Selected Plan
            </button>
            <button className="bg-white flex items-center text-[#8F96A9] border font-bold border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200">
              <RiDeleteBack2Line className="mr-2 " />
              Withdraw Plan
            </button>
            <button className="bg-white text-[#8F96A9] border font-bold border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200">
              Edit Plan Information
            </button>
          </div>
        </div>
        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={limitedDataSource}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{ backgroundColor: "#f0f0f0", color: "#000" }}
                >
                  {props.children}
                </th>
              ),
            },
          }}
        />
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg relative w-2/5">
            <button
              className="absolute top-2 right-2 text-gray-400 text-xl"
              onClick={handleCloseModal}
            >
              <IoMdClose />
            </button>
            <h2 className="text-xl text-center font-bold mb-10">
              Please select how you would like to add your order.
            </h2>
            <div className="flex space-x-4 justify-center mx-auto">
              <button className="flex flex-col items-center bg-white text-gray-600 w-72 h-48 px-4 py-2 justify-center rounded border border-gray-300 hover:border-green-500">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FaFileExcel className="text-green-500 text-3xl" />
                </div>
                <span className="text-lg font-semibold">
                  Add multiple items to Excel
                </span>
              </button>
              <button
                className="flex flex-col items-center bg-white text-gray-600 w-72 h-48 px-4 py-2 justify-center rounded border border-gray-300 hover:border-blue-500"
                onClick={handleAddOneDirectly}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <IoIosCreate className="text-blue-500 text-3xl" />
                </div>
                <span className="text-lg font-semibold">Add one directly</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isSecondModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg relative w-1/4 rounded-lg">
          <div className=" pt-5 px-8">
            <h1 className="text-base text-gray-500 flex justify-between items-center">
              Add plan
              <IoMdClose
                className="cursor-pointer text-gray-400"
                onClick={() => setIsSecondModalVisible(false)}
              />
            </h1>
          </div>
            <hr className="my-5" />
            <div className="px-8 pb-8">
            <h2 className="text-xl text-left font-bold mb-5">
              Plan Information
            </h2>
            <form>
              <label>Plan Creation Date</label>
              <DatePicker
                onChange={handleDateChange} 
                className="border mt-2 border-gray-300 rounded p-2 w-full mb-4"
                placeholder="Select creation date"
              />
              <label>Demand</label>
              <input
                type="text"
                required
                className="border mt-2 border-gray-300 rounded p-2 w-full mb-4"
              />
              <label>Plan Priority</label>
              <div className="mt-2 mb-4 rounded-md shadow-sm w-full flex" role="group">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
                >
                  Low
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
                >
                  Medium
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 focus:font-bold hover:bg-gray-100 rounded-e-lg hover:text-primary focus:z-10 focus:ring-2 focus:ring-primary focus:text-primary"
                >
                  High
                </button>
              </div>
              <label>Destination</label>
              <input
                type="text"
                required
                className="border mt-2 border-gray-300 rounded p-2 w-full mb-4"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsSecondModalVisible(false)}
                  className="mr-4 w-16 font-medium text-gray-400 border border-gray-300 px-4 py-2 rounded-lg flex justify-center items-center"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-primary/50 w-32 font-medium text-white px-4 py-2 rounded-lg flex justify-center items-center hover:bg-primary"
                >
                  Add
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;
