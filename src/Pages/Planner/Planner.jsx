import React, { useState, useEffect, useRef } from "react";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import { FaPlus } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TiFilter } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { DatePicker, Space, Table, notification } from "antd";
import { RiExpandUpDownFill } from "react-icons/ri";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaFileExcel } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { API_KEY } from "../../config";
import moment from "moment";
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

const columns = [
  {
    title: "ID",
    dataIndex: "id",
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
    title: "Demand",
    dataIndex: "demand",
  },
  {
    title: "Destination",
    dataIndex: "destination",
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
];

// Data source for the table
const initialDataSource = Array.from({ length: 46 }).map((_, i) => ({
  key: i,
  id: `ID-${i}`,
  demand: `Demand ${i} tons`,
  destination: `Destination ${i}`,
  status:
    i % 5 === 0
      ? "Draft"
      : i % 4 === 0
      ? "Completed"
      : i % 4 === 1
      ? "Approved"
      : i % 4 === 2
      ? "Rejected"
      : "Pending",
  priority: i % 2 === 0 ? "High" : "Low",
  deadline: `2023-12-${(i % 30) + 1}`,
  createdDate: `2023-11-${(i % 30) + 1}`,
}));

const Planner = () => {
  const { RangePicker } = DatePicker;
  const [dataSource, setDataSource] = useState(initialDataSource);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState(dataSource.length);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [isDetailedFilterVisible, setIsDetailedFilterVisible] = useState(true);
  const [destination, setDestination] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [ward, setWard] = useState("");
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editData, setEditData] = useState([]);
  const [singleEditPlan, setSingleEditPlan] = useState(null);
  const [demandInput, setDemandInput] = useState("");
  const [priorityInput, setPriorityInput] = useState(null);
  const [modalPriorityInput, setModalPriorityInput] = useState(null);
  const [deadlineInput, setDeadlineInput] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [activeTimeFrame, setActiveTimeFrame] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);

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
    setIsUploadModalVisible(false);
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

  const toggleDetailedFilter = () => {
    setIsDetailedFilterVisible(!isDetailedFilterVisible);
  };

  // Function to fetch autocomplete predictions
  const fetchPredictions = async (input) => {
    if (!input) {
      setPredictions([]); // Clear predictions if input is empty
      return;
    }

    const response = await fetch(
      `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${API_KEY}&components=country:vn`
    );
    const data = await response.json();
    setPredictions(data.predictions || []);
  };

  const handleDestinationChange = (event) => {
    const value = event.target.value;
    setDestination(value); // Update destination state
    fetchPredictions(value); // Fetch predictions based on input
  };

  const resetFormFields = () => {
    setDemandInput("");
    setDestination("");
    setDeadlineInput("");
    setPriorityInput("Low");
  };

  const handleAddOneDirectly = () => {
    const newPlan = {
      key: dataSource.length,
      id: `ID-${dataSource.length}`,
      demand: demandInput,
      destination: destination,
      status: "Draft",
      priority: modalPriorityInput,
      deadline: deadlineInput,
      createdDate: new Date().toISOString().split("T")[0],
    };

    setDataSource((prevData) => [...prevData, newPlan]);
    setIsModalVisible(false);
    setIsSecondModalVisible(false);
    resetFormFields();
  };

  const showUploadModal = () => {
    setIsUploadModalVisible(true);
    setIsModalVisible(false);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalVisible(false);
  };

  const handleDeletePlans = async () => {
    setDataSource((prevData) =>
      prevData.filter((item) => !selectedRowKeys.includes(item.key))
    );
    setSelectedRowKeys([]);
  };

  // Function to handle editing selected plans
  const handleEditPlans = () => {
    if (selectedRowKeys.length === 0) {
      // Show notification if no plans are selected
      notification.warning({
        message: "Please choose your plan",
        description: "You need to select at least one plan to edit.",
        placement: "topRight",
      });
      return;
    }

    const selectedPlans = dataSource.filter((item) =>
      selectedRowKeys.includes(item.key)
    );
    setEditData(selectedPlans); // Set the data to be edited
    setSingleEditPlan(selectedPlans[0]); // Set the first selected plan for editing
    setIsEditModalVisible(true);
  };

  const handleShowAddOneModal = () => {
    setIsModalVisible(false);
    setIsSecondModalVisible(true);
    setIsFormSubmitted(false); // Reset form submitted state
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set the active button
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
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg  ${
              activeButton === "view" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleButtonClick("view")}
          >
            View Entire Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200   ${
              activeButton === "draft" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleButtonClick("draft")}
          >
            View Draft Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
              activeButton === "pending" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleButtonClick("pending")}
          >
            Manage Pending Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200   ${
              activeButton === "approved" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleButtonClick("approved")}
          >
            Manage Approved Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200   ${
              activeButton === "completed" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleButtonClick("completed")}
          >
            Manage Completed Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg  ${
              activeButton === "rejected" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleButtonClick("rejected")}
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
                  className="block w-full p-2 ps-10 text-sm text-[#8F96A9] border border-gray-300 rounded-lg bg-gray-50 "
                  placeholder="Please enter your ID plans, destination, etc."
                />
              </div>
            </form>
            <button
              className="text-[#8F96A9] border border-gray-300 rounded-md px-2 py-2 flex items-center text-sm font-bold"
              onClick={toggleDetailedFilter}
            >
              <TiFilter className="mr-2" />
              Detailed Filter
            </button>
            <button className="text-primary border border-primary w-20 justify-center rounded-md px-2 py-2 flex items-center text-sm font-bold">
              View
            </button>
          </div>
        </div>

        {isDetailedFilterVisible && (
          <>
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
                  <option>Created Date</option>
                  <option>Deadline</option>
                </select>
                <IoMdArrowDropdown className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500, text-[1.8rem] mt-1" />
              </div>

              <div className="inline-flex rounded-md shadow-sm " role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg ${
                    activeTimeFrame === "today" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveTimeFrame("today")}
                >
                  Today
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                    activeTimeFrame === "1week" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveTimeFrame("1week")}
                >
                  1 Week
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                    activeTimeFrame === "1month" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveTimeFrame("1month")}
                >
                  1 Month
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg ${
                    activeTimeFrame === "3months" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveTimeFrame("3months")}
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
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg ${
                    activeStatus === "draft" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveStatus("draft")}
                >
                  Draft
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                    activeStatus === "pending" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveStatus("pending")}
                >
                  Pending
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                    activeStatus === "approved" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveStatus("approved")}
                >
                  Approved
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                    activeStatus === "rejected" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveStatus("rejected")}
                >
                  Rejected
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg ${
                    activeStatus === "completed" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setActiveStatus("completed")}
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
                  className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg ${
                    priorityInput === "Low" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setPriorityInput("Low")}
                >
                  Low
                </button>
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg  ${
                    priorityInput === "High" ? "bg-orange-100 text-primary border-primary" : ""
                  }`}
                  onClick={() => setPriorityInput("High")}
                >
                  High
                </button>
              </div>
            </div>
          </>
        )}

        {/* Plans Summary */}
        <div className="flex justify-between items-center mt-10 mb-5 text-gray-600">
          <div className="flex space-x-4 items-center">
            <span>Selected Plans: {selectedRowKeys.length}</span>
            <span className="text-gray-400">|</span>
            <span>Total Plans: {dataSource.length}</span>
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
            <button
              className="bg-white flex items-center text-[#8F96A9] border font-bold border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={handleDeletePlans}
            >
              <RiDeleteBack2Line className="mr-2 " />
              Withdraw Plan
            </button>
            <button
              className="bg-white text-[#8F96A9] border font-bold border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200"
              onClick={handleEditPlans}
            >
              Edit Plan Information
            </button>
          </div>
        </div>
        {/* Table */}
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource} // Use the full data source for pagination
          pagination={{
            pageSize: rowsToDisplay, // Set the number of rows per page based on user selection
            onChange: (page, pageSize) => {
              setRowsToDisplay(pageSize); // Update rowsToDisplay when page size changes
            },
          }}
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
              <button
                className="flex flex-col items-center bg-white text-gray-600 w-72 h-48 px-4 py-2 justify-center rounded border border-gray-300 hover:border-green-500"
                onClick={showUploadModal}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FaFileExcel className="text-green-500 text-3xl" />
                </div>
                <span className="text-lg font-semibold">
                  Add multiple items to Excel
                </span>
              </button>
              <button
                className="flex flex-col items-center bg-white text-gray-600 w-72 h-48 px-4 py-2 justify-center rounded border border-gray-300 hover:border-blue-500"
                onClick={handleShowAddOneModal}
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
              <form className="overflow-hidden">
                <label>Plan Creation Date</label>
                <input
                  type="date"
                  value={new Date().toISOString().split("T")[0]} // Set current date
                  className="border mt-2 border-gray-300 rounded p-2 w-full mb-4"
                  readOnly
                />
                <label>Deadline</label>
                <DatePicker
                  onChange={(date, dateString) => setDeadlineInput(dateString)}
                  className={`border mt-2 border-gray-300 rounded p-2 w-full mb-4 ${
                    isFormSubmitted && !deadlineInput ? "border-red-500" : ""
                  }`} // Highlight if empty on submit
                  placeholder="Select your deadline"
                  required
                />
                <label>Demand</label>
                <input
                  type="text"
                  required
                  value={demandInput}
                  onChange={(e) => setDemandInput(e.target.value)}
                  className={`border mt-2 border-gray-300 rounded p-2 w-full mb-4 ${
                    isFormSubmitted && !demandInput ? "border-red-500" : ""
                  }`} // Highlight if empty on submit
                  placeholder="Enter your demand"
                />

                <label>Plan Priority</label>
                <div
                  className="mt-2 mb-4 rounded-md shadow-sm w-full flex"
                  role="group"
                >
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg ${
                      modalPriorityInput === "Low" ? "bg-orange-100 text-primary border-primary" : ""
                    }`}
                    onClick={() => setModalPriorityInput("Low")}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg ${
                      modalPriorityInput === "High" ? "bg-orange-100 text-primary border-primary" : ""
                    }`}
                    onClick={() => setModalPriorityInput("High")}
                  >
                    High
                  </button>
                </div>
                <label>Destination</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(event) => {
                    const value = event.target.value;
                    setDestination(value); // Update destination state directly
                    fetchPredictions(value); // Fetch predictions based on input
                  }}
                  className={`border mt-2 border-gray-300 rounded p-2 w-full mb-1 ${
                    isFormSubmitted && !destination ? "border-red-500" : ""
                  }`} // Highlight if empty on submit
                  placeholder="Enter your destination"
                />
                {predictions.length > 0 && (
                  <ul className="border border-gray-300 rounded mt-2 max-h-40 overflow-y-auto">
                    {predictions.map((prediction) => (
                      <li
                        key={prediction.place_id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDestination(prediction.description);
                          setPredictions([]);
                        }}
                      >
                        {prediction.description}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSecondModalVisible(false);
                      resetFormFields(); // Reset form fields when closing modal
                      setIsFormSubmitted(false); // Reset form submitted state
                    }}
                    className="mr-4 w-16 font-medium text-gray-400 border border-gray-300 px-4 py-2 rounded-lg flex justify-center items-center"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-primary/50 w-32 font-medium text-white px-4 py-2 rounded-lg flex justify-center items-center hover:bg-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsFormSubmitted(true); // Set form submitted state
                      // Validation check
                      if (!demandInput || !destination || !deadlineInput) {
                        notification.warning({
                          message: "Missing Fields",
                          description: "Please fill in all required fields.",
                          placement: "topRight",
                        });
                        return;
                      }

                      handleAddOneDirectly();
                    }}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isUploadModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative w-[40rem]">
            <button
              className="absolute top-2 right-2 text-gray-400 text-xl"
              onClick={handleCloseUploadModal}
            >
              <IoMdClose />
            </button>
            <h2 className="text-xl text-center font-bold mb-10">
              Please upload the route Excel file that will be used for
              dispatching.
            </h2>
            <div className="flex flex-col items-center border border-gray-300 rounded p-5">
              <FaFileUpload className="text-primary w-9 h-9" />
              <span className="my-3 text-sm text-gray-500">
                Please drag and drop files here
              </span>
              <label className="border border-gray-300 rounded p-2 mb-4 cursor-pointer text-xs text-gray-500">
                Browse on my PC
                <input type="file" className="hidden" />
              </label>
            </div>
            <p className="text-center mt-4 ">
              Don't have the Root Excel form? Click the button below to download
              it.
            </p>
            <div className="flex justify-center">
              <button className="mt-2 text-primary font-medium underline">
                Download Order Upload Excel Form
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg relative w-1/4">
            <button
              className="absolute top-2 right-2 text-gray-400 text-xl"
              onClick={() => setIsEditModalVisible(false)}
            >
              <IoMdClose />
            </button>
            <h2 className="text-xl text-center font-bold mb-10">
              Edit Selected Plans
            </h2>
            <div className="mb-4">
              <h3 className="font-semibold inline">Editing Plans:</h3>
              <span className="ml-2">
                {editData.map((plan, index) => (
                  <span key={plan.key}>
                    {plan.id}
                    {index < editData.length - 1 ? ", " : ""}{" "}
                  </span>
                ))}
              </span>
            </div>
            <form>
              {singleEditPlan && (
                <div className="mb-4">
                  <label>Plan Creation Date</label>
                  <DatePicker
                    defaultValue={
                      singleEditPlan.createdDate
                        ? moment(singleEditPlan.createdDate)
                        : null
                    }
                    className="border mt-2 border-gray-300 rounded p-2 w-full mb-2"
                    onChange={(date, dateString) => {
                      setSingleEditPlan({
                        ...singleEditPlan,
                        createdDate: dateString,
                      });
                    }}
                  />
                  <label>Deadline</label>
                  <DatePicker
                    defaultValue={
                      singleEditPlan.deadline
                        ? moment(singleEditPlan.deadline)
                        : null
                    }
                    className="border mt-2 border-gray-300 rounded p-2 w-full mb-2"
                    onChange={(date, dateString) => {
                      setSingleEditPlan({
                        ...singleEditPlan,
                        deadline: dateString,
                      });
                    }}
                  />
                  <label>Demand</label>
                  <input
                    type="text"
                    defaultValue={singleEditPlan.demand}
                    className={`border mt-2 border-gray-300 rounded p-2 w-full mb-2 ${
                      !singleEditPlan.demand ? "border-red-500" : ""
                    }`}
                    onChange={(e) => {
                      setSingleEditPlan({
                        ...singleEditPlan,
                        demand: e.target.value,
                      });
                    }}
                  />
                  <label>Priority</label>
                  <div
                    className="mt-2 mb-4 rounded-md shadow-sm w-full flex"
                    role="group"
                  >
                    <button
                      type="button"
                      className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg ${
                        singleEditPlan.priority === "Low" ? "bg-orange-100 text-primary border-primary" : ""
                      }`}
                      onClick={() => setSingleEditPlan({ ...singleEditPlan, priority: "Low" })}
                    >
                      Low
                    </button>
                    <button
                      type="button"
                      className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg ${
                        singleEditPlan.priority === "High" ? "bg-orange-100 text-primary border-primary" : ""
                      }`}
                      onClick={() => setSingleEditPlan({ ...singleEditPlan, priority: "High" })}
                    >
                      High
                    </button>
                  </div>
                  <label>Destination</label>
                  <input
                    type="text"
                    required
                    value={singleEditPlan.destination}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSingleEditPlan({
                        ...singleEditPlan,
                        destination: value,
                      });
                      fetchPredictions(value);
                    }}
                    className="border mt-2 border-gray-300 rounded p-2 w-full mb-1"
                    placeholder="Enter your destination"
                  />
                  {predictions.length > 0 && (
                    <ul className="border border-gray-300 rounded mt-2 max-h-40 overflow-y-auto">
                      {predictions.map((prediction) => (
                        <li
                          key={prediction.place_id}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSingleEditPlan({
                              ...singleEditPlan,
                              destination: prediction.description,
                            });
                            setPredictions([]);
                          }}
                        >
                          {prediction.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalVisible(false)}
                  className="mr-4 w-16 font-medium text-gray-400 border border-gray-300 px-4 py-2 rounded-lg flex justify-center items-center"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-primary/50 w-32 font-medium text-white px-4 py-2 rounded-lg flex justify-center items-center hover:bg-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    // Validation check
                    if (
                      !singleEditPlan.demand ||
                      !singleEditPlan.destination ||
                      !singleEditPlan.deadline
                    ) {
                      notification.warning({
                        message: "Missing Fields",
                        description: "Please fill in all required fields.",
                        placement: "topRight",
                      });
                      return;
                    }
                    // Logic to save edited plan back to dataSource
                    setDataSource((prevData) =>
                      prevData.map((item) =>
                        selectedRowKeys.includes(item.key)
                          ? { ...item, ...singleEditPlan }
                          : item
                      )
                    );
                    setIsEditModalVisible(false);
                  }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;
