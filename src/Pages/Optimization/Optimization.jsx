import React, { useState } from "react";
import Logo from "../../assets/Home/Logo/Logo.png";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import "./Optimization.css";
const plansData = [
  {
    id: "PP-1",
    totalRoutes: 2,
    totalAmount: 500,
    routes: [
      {
        id: 1,
        from: "A",
        to: "B",
        amount: 250,
        cost: 100,
        transportUnit: "Truck",
        estimatedTime: "2 hours",
      },
      {
        id: 2,
        from: "C",
        to: "D",
        amount: 250,
        cost: 150,
        transportUnit: "Van",
        estimatedTime: "3 hours",
      },
    ],
  },
  {
    id: "PP-2",
    totalRoutes: 3,
    totalAmount: 750,
    routes: [
      {
        id: 1,
        from: "E",
        to: "F",
        amount: 300,
        cost: 200,
        transportUnit: "Ship",
        estimatedTime: "5 hours",
      },
      {
        id: 2,
        from: "G",
        to: "H",
        amount: 450,
        cost: 300,
        transportUnit: "Train",
        estimatedTime: "4 hours",
      },
      {
        id: 3,
        from: "I",
        to: "J",
        amount: 150,
        cost: 100,
        transportUnit: "Truck",
        estimatedTime: "1 hour",
      },
    ],
  },
  {
    id: "PP-3",
    totalRoutes: 4,
    totalAmount: 1000,
    routes: [
      {
        id: 1,
        from: "K",
        to: "L",
        amount: 400,
        cost: 250,
        transportUnit: "Cargo Plane",
        estimatedTime: "3 hours",
      },
      {
        id: 2,
        from: "M",
        to: "N",
        amount: 300,
        cost: 150,
        transportUnit: "Truck",
        estimatedTime: "2 hours",
      },
      {
        id: 3,
        from: "O",
        to: "P",
        amount: 200,
        cost: 100,
        transportUnit: "Van",
        estimatedTime: "1.5 hours",
      },
      {
        id: 4,
        from: "Q",
        to: "R",
        amount: 100,
        cost: 50,
        transportUnit: "Bicycle",
        estimatedTime: "0.5 hours",
      },
    ],
  },
  {
    id: "PP-4",
    totalRoutes: 5,
    totalAmount: 1200,
    routes: [
      {
        id: 1,
        from: "S",
        to: "T",
        amount: 500,
        cost: 300,
        transportUnit: "Ship",
        estimatedTime: "6 hours",
      },
      {
        id: 2,
        from: "U",
        to: "V",
        amount: 300,
        cost: 200,
        transportUnit: "Train",
        estimatedTime: "4 hours",
      },
      {
        id: 3,
        from: "W",
        to: "X",
        amount: 200,
        cost: 100,
        transportUnit: "Truck",
        estimatedTime: "3 hours",
      },
      {
        id: 4,
        from: "Y",
        to: "Z",
        amount: 150,
        cost: 75,
        transportUnit: "Motorcycle",
        estimatedTime: "2 hours",
      },
      {
        id: 5,
        from: "AA",
        to: "AB",
        amount: 50,
        cost: 25,
        transportUnit: "Bicycle",
        estimatedTime: "1 hour",
      },
    ],
  },
];

const Order = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filterRoutes, setFilterRoutes] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [hoveredRoute, setHoveredRoute] = useState(null);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  const resetFilters = () => {
    setFilterRoutes("");
    setFilterAmount("");
  };

  const filteredPlans = plansData.filter((plan) => {
    const matchesRoutes = filterRoutes
      ? plan.totalRoutes === parseInt(filterRoutes)
      : true;
    const matchesAmount = filterAmount
      ? plan.totalAmount === parseInt(filterAmount)
      : true;
    return matchesRoutes && matchesAmount;
  });

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <NavBarPlanner />
      <div className="flex flex-1 mt-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r p-6 bg-white shadow-lg">
          {/* Filters */}
          <div className="flex flex-col space-y-4 mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <FaFilter className="text-primary w-4 h-4 mr-2" />
              <span className="font-semibold text-gray-700">
                Filter Plans By:
              </span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              {/* Routes Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Total Routes
                </label>
                <input
                  type="number"
                  value={filterRoutes}
                  onChange={(e) => setFilterRoutes(e.target.value)}
                  className="border border-gray-300  rounded-md px-3 py-2 text-gray-700 mt-1 w-24"
                  min="0"
                />
              </div>

              {/* Amount Filter */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  Total Amount
                </label>
                <input
                  type="number"
                  value={filterAmount}
                  onChange={(e) => setFilterAmount(e.target.value)}
                  className="border border-gray-300  rounded-md px-3 py-2 text-gray-700 mt-1 w-24"
                  min="0"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="flex items-center text-red-500 hover:text-red-600 font-semibold mt-5 ml-4"
              >
                <GrPowerReset className="w-4 h-4 mr-1" />
                Reset
              </button>
            </div>
          </div>

          {/* Plans List */}
          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-100 ${
                  selectedPlan?.id === plan.id ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() => handlePlanClick(plan)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-gray-800">
                    {plan.id}
                  </span>
                  <span className="text-gray-600 text-sm">
                    Routes: {plan.totalRoutes} | Amount: {plan.totalAmount} tons
                  </span>
                </div>
                {/* Route Details */}
                {selectedPlan?.id === plan.id && (
                  <ul className="ml-4 mt-3 space-y-2">
                    {plan.routes.map((route) => (
                      <li
                        key={route.id}
                        className="relative bg-gray-50 p-2 rounded-lg border hover:bg-gray-100 cursor-pointer"
                        onMouseEnter={() => setHoveredRoute(route)}
                        onMouseLeave={() => setHoveredRoute(null)}
                      >
                        Route {route.id}: From {route.from} to {route.to}
                        {/* Hover Card */}
                        {hoveredRoute?.id === route.id && (
                          <div className="absolute  left-6 top-0 bg-white border border-gray-200 shadow-lg p-4 rounded-lg w-64 z-10">
                            <h3 className="font-bold text-center text-gray-700">
                              Route Details
                            </h3>
                            <p>
                              <strong>From:</strong> {route.from}
                            </p>
                            <p>
                              <strong>To:</strong> {route.to}
                            </p>
                            <p>
                              <strong>Amount:</strong> {route.amount} tons
                            </p>
                            <p>
                              <strong>Cost:</strong> ${route.cost}
                            </p>
                            <p>
                              <strong>Transport:</strong> {route.transportUnit}
                            </p>
                            <p>
                              <strong>Time:</strong> {route.estimatedTime}
                            </p>
                            <button
                              onClick={() =>
                                (window.location.href = "/procurement")
                              }
                              className="mt-3 bg-primary text-white py-1 px-4 rounded hover:bg-orange-600"
                            >
                              Choose
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Map Area */}
        <div className="w-full md:w-2/3 lg:w-3/4 p-6 flex items-center justify-center bg-gray-100">
          <div className="border rounded-lg h-full w-full flex items-center justify-center bg-white">
            <p className="text-gray-400">Map will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
