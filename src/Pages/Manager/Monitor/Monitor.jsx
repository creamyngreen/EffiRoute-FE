import React, { useState } from "react";
import NavBarManager from "../../../Components/NavBarManager/NavBarManager";
import { GrPlan } from "react-icons/gr";
import { MdIncompleteCircle } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { IoMdTrendingUp } from "react-icons/io";
import { IoMdTrendingDown } from "react-icons/io";
import { Line } from "@ant-design/charts";
import { Select } from "antd";

const { Option } = Select;

const Monitor = () => {
  const [selectedMonthCompleted, setSelectedMonthCompleted] = useState("January");
  const [selectedMonthDemand, setSelectedMonthDemand] = useState("January");

  const completedPlanData = {
    January: [
      { month: "Week 1", value: 3000 },
      { month: "Week 2", value: 4000 },
      { month: "Week 3", value: 3500 },
      { month: "Week 4", value: 5000 },
    ],
    February: [
      { month: "Week 1", value: 4500 },
      { month: "Week 2", value: 6000 },
      { month: "Week 3", value: 5500 },
      { month: "Week 4", value: 7000 },
    ],
    
  };

  const demandData = {
    January: [
      { month: "Week 1", value: 2000 },
      { month: "Week 2", value: 2500 },
      { month: "Week 3", value: 3000 },
      { month: "Week 4", value: 3500 },
    ],
    February: [
      { month: "Week 1", value: 3000 },
      { month: "Week 2", value: 3500 },
      { month: "Week 3", value: 4000 },
      { month: "Week 4", value: 4500 },
    ],
   
  };

  const completedPlanConfig = {
    data: completedPlanData[selectedMonthCompleted],
    xField: "month",
    yField: "value",

  };

  const demandConfig = {
    data: demandData[selectedMonthDemand],
    xField: "month",
    yField: "value",

  };

  return (
    <>
      <NavBarManager />
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="flex justify-between mb-4">
          <div className="w-1/4 mx-2 p-4 border border-gray-300 rounded-lg text-left flex justify-between items-center">
            <div className="flex-1">
              <h2 className="text-2xl text-gray-400 font-semibold">
                Total Plan
              </h2>
              <p className="text-4xl font-bold mt-4 mb-7">40,689</p>
              <p className="text-xl flex items-center">
                <span className="text-[#00B69B] flex items-center">
                  <IoMdTrendingUp className="mr-2" />
                  8.5% Up
                </span>
                <span className="text-black ml-2">from yesterday</span>
              </p>
            </div>
            <div className="border bg-[#E4E4FF] text-[#8280FF] -mt-12 mr-12 rounded-2xl p-2">
              <GrPlan className="text-5xl  " />
            </div>
          </div>
          <div className="w-1/4 mx-2 p-4 border border-gray-300  rounded-lg text-left flex justify-between items-center">
            <div className="flex-1">
              <h2 className="text-2xl text-gray-400 font-semibold">
                Total Pending Plan
              </h2>
              <p className="text-4xl font-bold mt-4 mb-7">10,293</p>
              <p className="text-xl flex items-center">
                <span className="text-[#00B69B] flex items-center">
                  <IoMdTrendingUp className="mr-2" />
                  1.3% Up
                </span>
                <span className="text-black ml-2">from past week</span>
              </p>
            </div>
            <div className=" bg-[#FEF2D6] text-[#FEC53D] -mt-12 mr-12 rounded-2xl p-2">
              <MdIncompleteCircle className="text-5xl  " />
            </div>
          </div>
          <div className="w-1/4 mx-2 p-4 border border-gray-300 rounded-lg text-left flex justify-between items-center">
            <div className="flex-1">
              <h2 className="text-2xl text-gray-400 font-semibold">
                Total Accepted Plan
              </h2>
              <p className="text-4xl font-bold mt-4 mb-7">89,000</p>
              <p className="text-xl flex items-center">
                <span className="text-red-400 flex items-center">
                  <IoMdTrendingDown className="mr-2" />
                  4.3% Down
                </span>
                <span className="text-black ml-2">from yesterday</span>
              </p>
            </div>
            <div className=" bg-[#D9F7E7] text-[#4AD991] -mt-12 mr-12 rounded-2xl p-2">
              <FaCheck className="text-5xl  " />
            </div>
          </div>
          <div className="w-1/4 mx-2 p-4 border border-gray-300 rounded-lg text-left flex justify-between items-center">
            <div className="flex-1">
              <h2 className="text-2xl text-gray-400 font-semibold">
                Total Rejected Plan
              </h2>
              <p className="text-4xl font-bold mt-4 mb-7">40,689</p>
              <p className="text-xl flex items-center">
                <span className="text-[#00B69B] flex items-center">
                  <IoMdTrendingUp className="mr-2" />
                  8.5% Up
                </span>
                <span className="text-black ml-2">from yesterday</span>
              </p>
            </div>
            <div className=" bg-[#FFDED2] text-[#FF9871] -mt-12 mr-12 rounded-2xl p-2">
              <HiXMark className="text-5xl  " />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Plans Details</h2>
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">

            <h1 className="text-2xl font-bold flex-grow text-center">Total Completed Plan by Week</h1>
            <div className="ml-auto">
              <Select
                defaultValue={selectedMonth}
                style={{ width: 120 }}
                onChange={(value) => setSelectedMonth(value)}
              >
                <Option value="January">January</Option>
                <Option value="February">February</Option>
                <Option value="March">March</Option>
                <Option value="April">April</Option>
                <Option value="May">May</Option>
                <Option value="June">June</Option>
                <Option value="July">July</Option>
                <Option value="August">August</Option>
                <Option value="September">September</Option>
                <Option value="October">October</Option>
                <Option value="November">November</Option>
                <Option value="December">December</Option>
              </Select>
            </div>
          </div>
          <div className="sales-chart">
            <Line {...completedPlanConfig} />
          </div>

          <div className="flex justify-between items-center mt-8 mb-4">
            <h1 className="text-2xl font-bold">Number of Demand by Week</h1>
            <Select
              defaultValue={selectedMonthDemand}
              style={{ width: 120 }}
              onChange={(value) => setSelectedMonthDemand(value)}
            >
              <Option value="January">January</Option>
              <Option value="February">February</Option>
              <Option value="March">March</Option>
              <Option value="April">April</Option>
              <Option value="May">May</Option>
              <Option value="June">June</Option>
              <Option value="July">July</Option>
              <Option value="August">August</Option>
              <Option value="September">September</Option>
              <Option value="October">October</Option>
              <Option value="November">November</Option>
              <Option value="December">December</Option>
            </Select>
          </div>
          <div className="sales-chart">
            <Line {...demandConfig} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Monitor;
