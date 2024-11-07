/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import { FaPlus } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { TiFilter } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { DatePicker, Space, Table, notification, Empty } from "antd";
import { RiExpandUpDownFill } from "react-icons/ri";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaFileExcel } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaFileUpload } from "react-icons/fa";
import { API_KEY } from "../../config";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  doAddPlan,
  fetchPlans,
  searchPlans,
  deletePlans,
  updatePlans,
} from "../../redux/action/plannerAction";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const getStatusTag = (status) => {
  switch (status) {
    case "Completed":
      return (
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
          Completed
        </span>
      );
    case "approved":
      return (
        <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded">
          Approved
        </span>
      );
    case "draft":
      return (
        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">
          Draft
        </span>
      );
    case "rejected":
      return (
        <span className="bg-red-200 text-red-800 px-2 py-1 rounded">
          Rejected
        </span>
      );
    case "pending":
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
    sorter: (a, b) =>
      moment(a.createdDate).unix() - moment(b.createdDate).unix(),
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    sorter: (a, b) => moment(a.deadline).unix() - moment(b.deadline).unix(),
  },
  {
    title: "Demand",
    dataIndex: "demand",
    render: (text) => `${text} tons`,
    sorter: (a, b) => a.demand - b.demand,
  },
  {
    title: "Destination",
    dataIndex: "destination",
    sorter: (a, b) => a.destination.localeCompare(b.destination),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    render: (text) => getPriorityTag(text),
    sorter: (a, b) => a.priority.localeCompare(b.priority),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => getStatusTag(text),
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
];

const CustomEmpty = () => (
  <div className="flex flex-col items -center justify-center py-8">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <div className="text-center">
          <p className="text-gray-500 text-base mb-2">
            No matching plans found
          </p>
          <p className="text-gray-400 text-sm">
            Try adjusting your filter criteria or search terms
          </p>
        </div>
      }
    />
  </div>
);

const Planner = () => {
  const { RangePicker } = DatePicker;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [isDetailedFilterVisible, setIsDetailedFilterVisible] = useState(true);
  const [destination, setDestination] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editData, setEditData] = useState([]);
  const [singleEditPlan, setSingleEditPlan] = useState({
    demand: "",
    destination: "",
    deadline: "",
    priority: "Low",
  });
  const [demandInput, setDemandInput] = useState("");
  const [priorityInput, setPriorityInput] = useState(null);
  const [modalPriorityInput, setModalPriorityInput] = useState(null);
  const [deadlineInput, setDeadlineInput] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [activeTimeFrame, setActiveTimeFrame] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateType, setDateType] = useState("createdDate");
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const { plans, isLoading } = useSelector((state) => state.planner);
  const user = useSelector((state) => state.account.userInfo);
  const [currentFilters, setCurrentFilters] = useState({});

  // Transform data for table display
  const tableData = useMemo(() => {
    if (!plans?.data || !Array.isArray(plans.data)) {
      return [];
    }

    // Filter data based on activeTab if not on "all" tab
    const filteredData =
      activeTab === "all"
        ? plans.data
        : plans.data.filter((plan) => plan.status.toLowerCase() === activeTab);

    return filteredData.map((plan) => ({
      key: plan.id,
      id: plan.id,
      createdDate: moment(plan.createdAt).format("YYYY-MM-DD"),
      deadline: moment(plan.deadline).format("YYYY-MM-DD"),
      demand: plan.demand,
      destination: plan.destination,
      priority:
        plan.priority === 1 || plan.priority === "1" || plan.priority === "High"
          ? "High"
          : "Low",
      status: plan.status,
    }));
  }, [plans?.data, activeTab]);

  useEffect(() => {
    dispatch(fetchPlans(currentPage, pageSize, currentFilters));
  }, [dispatch, currentPage, pageSize, currentFilters]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsUploadModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRowsChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1);
    dispatch(fetchPlans(1, newPageSize, currentFilters));
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

  const resetFormFields = () => {
    setDemandInput("");
    setDestination("");
    setDeadlineInput("");
    setPriorityInput("Low");
  };

  const handleAddOneDirectly = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (!demandInput || !destination || !deadlineInput || !modalPriorityInput) {
      notification.warning({
        message: "Missing Fields",
        description: "Please fill in all required fields.",
        placement: "topRight",
      });
      return;
    }

    try {
      console.log("Selected priority:", modalPriorityInput);

      const planData = {
        plannerId: user.user_id,
        managerId: "3",
        deadline: deadlineInput,
        destination: destination,
        priority: modalPriorityInput === "High" ? 1 : 0,
        demand: demandInput,
      };

      console.log("Plan data being sent:", planData);

      // Call API through Redux action
      await dispatch(doAddPlan(planData));

      // Refresh the plans list
      await dispatch(fetchPlans(currentPage, pageSize));

      notification.success({
        message: "Success",
        description: "Plan added successfully",
        placement: "topRight",
      });

      // Close modals and reset form
      setIsModalVisible(false);
      setIsSecondModalVisible(false);
      resetFormFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Failed to add plan",
        placement: "topRight",
      });
    }
  };

  const showUploadModal = () => {
    setIsUploadModalVisible(true);
    setIsModalVisible(false);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalVisible(false);
  };

  const handleDeletePlans = () => {
    if (selectedRowKeys.length === 0) {
      // Show notification if no plans are selected
      notification.warning({
        message: "No Plans Selected",
        description: "Please select at least one plan to withdraw.",
        placement: "topRight",
      });
      return;
    }
    setIsDeleteModalVisible(true);
  };

  const confirmDeletePlans = async () => {
    try {
      // Call the delete action with selected IDs
      await dispatch(deletePlans(selectedRowKeys));

      // Show success notification
      notification.success({
        message: "Success",
        description: "Selected plans have been deleted successfully",
        placement: "topRight",
      });

      // Clear selection and close modal
      setSelectedRowKeys([]);
      setIsDeleteModalVisible(false);

      // Refresh the plans list
      dispatch(fetchPlans(currentPage, pageSize));
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Failed to delete plans",
        placement: "topRight",
      });
    }
  };

  const cancelDeletePlans = () => {
    setIsDeleteModalVisible(false);
  };

  // Function to handle editing selected plans
  const handleEditPlans = () => {
    if (selectedRowKeys.length === 0) {
      notification.warning({
        message: "No Plans Selected",
        description: "Please select at least one plan to edit.",
        placement: "topRight",
      });
      return;
    }

    // Get the selected plans data
    const selectedPlans = plans.data.filter((plan) =>
      selectedRowKeys.includes(plan.id)
    );

    // Set the edit data for displaying IDs
    setEditData(selectedPlans);

    // Initialize form with first selected plan's data
    const firstPlan = selectedPlans[0];
    setSingleEditPlan({
      demand: firstPlan.demand,
      destination: firstPlan.destination,
      deadline: firstPlan.deadline,
      priority: firstPlan.priority,
      createdDate: firstPlan.createdDate,
    });

    setIsEditModalVisible(true);
  };

  const handleShowAddOneModal = () => {
    setIsModalVisible(false);
    setIsSecondModalVisible(true);
    setIsFormSubmitted(false);
  };

  // Handle date type change
  const handleDateTypeChange = (type) => {
    setDateType(type);
    // Reset active timeframe and date range when switching date types
    setActiveTimeFrame(null);
    setDateRange([null, null]);
  };

  // Handle timeframe selection
  const handleTimeFrameChange = (timeFrame) => {
    setActiveTimeFrame(timeFrame);

    const today = moment();
    let startDate;
    const currentEndDate = dateRange[1] ? moment(dateRange[1]) : today;

    switch (timeFrame) {
      case "today":
        startDate = today.startOf("day");
        break;
      case "1week":
        startDate = moment(currentEndDate).subtract(1, "week").startOf("day");
        break;
      case "1month":
        startDate = moment(currentEndDate).subtract(1, "month").startOf("day");
        break;
      case "3months":
        startDate = moment(currentEndDate).subtract(3, "months").startOf("day");
        break;
      default:
        return;
    }

    setDateRange([startDate, dateRange[1]]);
  };

  // Handle apply filter
  const handleApplyFilter = async () => {
    try {
      setCurrentPage(1);
      const filters = {
        status: activeTab === "all" ? activeStatus : activeTab,
        priority:
          priorityInput === "High" ? 1 : priorityInput === "Low" ? 0 : null,
        initialFrom:
          dateType === "createdDate"
            ? dateRange[0]?.format("YYYY-MM-DD")
            : null,
        initialTo:
          dateType === "createdDate"
            ? dateRange[1]?.format("YYYY-MM-DD")
            : null,
        deadlineFrom:
          dateType === "deadline" ? dateRange[0]?.format("YYYY-MM-DD") : null,
        deadlineTo:
          dateType === "deadline" ? dateRange[1]?.format("YYYY-MM-DD") : null,
      };

      // Remove null values
      Object.keys(filters).forEach(
        (key) =>
          (filters[key] === null || filters[key] === undefined) &&
          delete filters[key]
      );

      // Save current filters
      setCurrentFilters(filters);

      await dispatch(fetchPlans(1, pageSize, filters));
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Filter error:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);

    if (!value.trim()) {
      dispatch(fetchPlans(1, pageSize));
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch(searchPlans(value.trim()));
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const handleUpdatePlans = async (e) => {
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

    try {
      const plansToUpdate = editData.map((plan) => ({
        id: plan.id,
        demand: singleEditPlan.demand,
        priority: singleEditPlan.priority,
        destination: singleEditPlan.destination,
        deadline: moment(singleEditPlan.deadline).format("YYYY-MM-DD"),
      }));

      await dispatch(updatePlans(plansToUpdate));

      notification.success({
        message: "Success",
        description: "Plans updated successfully",
        placement: "topRight",
      });

      // Clear selection and close modal
      setSelectedRowKeys([]);
      setIsEditModalVisible(false);

      // Refresh the plans list
      dispatch(fetchPlans(currentPage, pageSize));
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Failed to update plans",
        placement: "topRight",
      });
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      ["Deadline", "Demand", "Destination", "Priority"],
      ["5/15/2024", "100", "Ho Chi Minh City", "High"],
      ["12/25/2024", "75", "Ha Noi", "Low"],
      ["1/10/2025", "150", "Da Nang", "High"],
      ["3/15/2025", "200", "Can Tho", "Low"],
      ["4/20/2025", "125", "Bien Hoa", "High"],
    ];

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(templateData);

    ws["!cols"] = [
      { width: 15 }, // Deadline
      { width: 15 }, // Demand
      { width: 30 }, // Destination
      { width: 10 }, // Priority
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Procurement Plans");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "procurement_plan_template.xlsx");
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const plans = jsonData.slice(1).map((row) => {
          let deadline;
          if (row[0]) {
            const dateValue = row[0];
            if (typeof dateValue === "string") {
              deadline = moment(dateValue, ["M/D/YYYY", "MM/DD/YYYY"]).format(
                "YYYY-MM-DD"
              );
            }
          }
          const priorityString = row[3]?.toString().trim().toLowerCase();
          const priority = priorityString === "high" ? 1 : 0;

          return {
            plannerId: user.user_id,
            managerId: "3",
            deadline: deadline,
            demand: row[1],
            destination: row[2],
            priority: priority,
          };
        });

        try {
          for (const plan of plans) {
            await dispatch(doAddPlan(plan));
          }

          notification.success({
            message: "Success",
            description: `${plans.length} plans have been added successfully`,
            placement: "topRight",
          });

          dispatch(fetchPlans(currentPage, pageSize));
          handleCloseUploadModal();
        } catch (error) {
          console.error("API Error:", error);
          notification.error({
            message: "Error",
            description: error.message || "Failed to add plans",
            placement: "topRight",
          });
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("File Processing Error:", error);
      notification.error({
        message: "Error",
        description: "Failed to process Excel file",
        placement: "topRight",
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedRowKeys([]); // Clear selected rows when changing tabs

    // Reset filters
    setPriorityInput(null);
    setDateRange([null, null]);
    setActiveTimeFrame(null);
    setDateType("createdDate");
    setActiveStatus(null);

    const filters = tab === "all" ? {} : { status: tab };
    setCurrentFilters(filters); // Update current filters
    dispatch(fetchPlans(1, pageSize, filters));
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
              <FaArrowDown className="mr-2 text-xs" /> Download CSV
            </button>
            <button
              className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
              onClick={showModal}
            >
              <FaPlus className="mr-2 text-xs" /> Add Plan
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
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
              activeTab === "all" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleTabChange("all")}
          >
            View Entire Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
              activeTab === "draft" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleTabChange("draft")}
          >
            View Draft Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
              activeTab === "pending" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleTabChange("pending")}
          >
            Manage Pending Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
              activeTab === "approved" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleTabChange("approved")}
          >
            Manage Approved Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
              activeTab === "completed" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleTabChange("completed")}
          >
            Manage Completed Plans
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg ${
              activeTab === "rejected" ? "bg-gray-100 text-primary" : ""
            }`}
            onClick={() => handleTabChange("rejected")}
          >
            Manage Rejected Plans
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <form className="w-96" onSubmit={(e) => e.preventDefault()}>
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
                  value={searchQuery}
                  onChange={handleSearch}
                  className="block w-full p-2 ps-10 text-sm text-[#8F96A9] border border-gray-300 rounded-lg bg-gray-50"
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
            <button
              className="text-primary border border-primary w-30 justify-center rounded-md px-2 py-2 flex items-center text-sm font-bold"
              onClick={handleApplyFilter}
              disabled={isLoading}
            >
              {isLoading ? "Applying..." : "Apply Filter"}
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
                <select
                  className="border border-gray-300 text-sm px-4 py-2 pr-10 rounded-md focus:outline-none appearance-none"
                  value={dateType}
                  onChange={(e) => handleDateTypeChange(e.target.value)}
                >
                  <option value="createdDate">Created Date</option>
                  <option value="deadline">Deadline</option>
                </select>
                <IoMdArrowDropdown className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-[1.8rem] mt-1" />
              </div>

              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-s-lg ${
                    activeTimeFrame === "today"
                      ? "bg-orange-100 text-primary border-primary"
                      : ""
                  }`}
                  onClick={() => handleTimeFrameChange("today")}
                >
                  Today
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                    activeTimeFrame === "1week"
                      ? "bg-orange-100 text-primary border-primary"
                      : ""
                  }`}
                  onClick={() => handleTimeFrameChange("1week")}
                >
                  1 Week
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                    activeTimeFrame === "1month"
                      ? "bg-orange-100 text-primary border-primary"
                      : ""
                  }`}
                  onClick={() => handleTimeFrameChange("1month")}
                >
                  1 Month
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg ${
                    activeTimeFrame === "3months"
                      ? "bg-orange-100 text-primary border-primary"
                      : ""
                  }`}
                  onClick={() => handleTimeFrameChange("3months")}
                >
                  3 Months
                </button>
              </div>

              {/* Date Range Picker */}
              <Space direction="vertical" size={12}>
                <RangePicker
                  className="h-9 hover:bg-gray-200 focus:ring-primary"
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates)}
                  placeholder={[
                    `Start ${
                      dateType === "createdDate" ? "Created Date" : "Deadline"
                    }`,
                    `End ${
                      dateType === "createdDate" ? "Created Date" : "Deadline"
                    }`,
                  ]}
                />
              </Space>
            </div>

            {/* Only show Plan Status filter when on "View Entire Plans" tab */}
            {activeTab === "all" && (
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
                      activeStatus === "draft"
                        ? "bg-orange-100 text-primary border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveStatus(
                        activeStatus === "draft" ? null : "draft"
                      );
                    }}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                      activeStatus === "pending"
                        ? "bg-orange-100 text-primary border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveStatus(
                        activeStatus === "pending" ? null : "pending"
                      );
                    }}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                      activeStatus === "approved"
                        ? "bg-orange-100 text-primary border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveStatus(
                        activeStatus === "approved" ? null : "approved"
                      );
                    }}
                  >
                    Approved
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 ${
                      activeStatus === "rejected"
                        ? "bg-orange-100 text-primary border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveStatus(
                        activeStatus === "rejected" ? null : "rejected"
                      );
                    }}
                  >
                    Rejected
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg ${
                      activeStatus === "completed"
                        ? "bg-orange-100 text-primary border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveStatus(
                        activeStatus === "completed" ? null : "completed"
                      );
                    }}
                  >
                    Completed
                  </button>
                </div>
              </div>
            )}
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
                    priorityInput === "Low"
                      ? "bg-orange-100 text-primary border-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setPriorityInput(priorityInput === "Low" ? null : "Low");
                  }}
                >
                  Low
                </button>
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg  ${
                    priorityInput === "High"
                      ? "bg-orange-100 text-primary border-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setPriorityInput(priorityInput === "High" ? null : "High");
                  }}
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
            <span>Total Plans: {plans.total || 0}</span>
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
          dataSource={tableData}
          loading={isLoading}
          locale={{
            emptyText: <CustomEmpty />,
          }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: plans?.total || 0,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
              // Use the saved filters
              dispatch(fetchPlans(page, size, currentFilters));
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
          <div className="bg-white rounded shadow-lg relative w-1/4">
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
              <form className="overflow-hidden" onSubmit={handleAddOneDirectly}>
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
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  } // Disable past dates
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
                      modalPriorityInput === "Low"
                        ? "bg-orange-100 text-primary border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setModalPriorityInput("Low");
                    }}
                  >
                    Low
                  </button>
                  <button
                    type="button"
                    className={`flex-1 px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-e-lg  ${
                      modalPriorityInput === "High"
                        ? "bg-orange-100 text-primary border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setModalPriorityInput("High");
                    }}
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
                    className={`bg-primary/50 w-32 font-medium text-white px-4 py-2 rounded-lg 
                      flex justify-center items-center hover:bg-primary
                      ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add"}
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
              Please upload the procurement plan Excel file
            </h2>
            <div className="flex flex-col items-center border border-gray-300 rounded p-5">
              <FaFileUpload className="text-primary w-9 h-9" />
              <span className="my-3 text-sm text-gray-500">
                Please drag and drop files here
              </span>
              <label className="border border-gray-300 rounded p-2 mb-4 cursor-pointer text-xs text-gray-500 hover:bg-gray-50">
                Browse on my PC
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
            <p className="text-center mt-4">
              Don&apos;t have the template? Click the button below to download
              it.
            </p>
            <div className="flex justify-center">
              <button
                className="mt-2 text-primary font-medium underline hover:text-primary/80"
                onClick={downloadTemplate}
              >
                Download Procurement Plan Template
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
                  <label>Deadline</label>
                  <DatePicker
                    value={
                      singleEditPlan.deadline
                        ? moment(singleEditPlan.deadline)
                        : null
                    }
                    onChange={(date) => {
                      setSingleEditPlan((prev) => ({
                        ...prev,
                        deadline: date ? date.format("YYYY-MM-DD") : null,
                      }));
                    }}
                    className="border mt-2 border-gray-300 rounded p-2 w-full mb-2"
                  />

                  <label>Priority</label>
                  <select
                    value={singleEditPlan.priority}
                    onChange={(e) => {
                      setSingleEditPlan((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }));
                    }}
                    className="border mt-2 border-gray-300 rounded p-2 w-full mb-2"
                  >
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>

                  <label>Demand</label>
                  <input
                    type="number"
                    value={singleEditPlan.demand}
                    onChange={(e) => {
                      setSingleEditPlan((prev) => ({
                        ...prev,
                        demand: e.target.value,
                      }));
                    }}
                    className="border mt-2 border-gray-300 rounded p-2 w-full mb-2"
                  />

                  <label>Destination</label>
                  <input
                    type="text"
                    value={singleEditPlan.destination}
                    onChange={(e) => {
                      setSingleEditPlan((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }));
                    }}
                    className="border mt-2 border-gray-300 rounded p-2 w-full mb-2"
                  />
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
                  onClick={handleUpdatePlans}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg relative w-1/4">
            <h2 className="text-xl text-center font-bold mb-4">
              Confirm Deletion
            </h2>
            <p className="text-center mb-6">
              Are you sure you want to delete the selected plans?
            </p>
            <div className="flex justify-center">
              <button
                className="bg-primary hover:bg-orange-600 text-white px-4 py-2 w-28 rounded mr-5"
                onClick={confirmDeletePlans}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 w-28 rounded"
                onClick={cancelDeletePlans}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;
