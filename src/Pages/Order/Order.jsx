import React, { useState } from "react";
import Logo from "../../assets/Home/Logo/Logo.png";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import filter from "../../assets/Admin/filter.png";
import reset from "../../assets/Admin/reset.png";
import ProgressStep from "../../Components/ProgressStep/ProgressStep";
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
    <div className="flex flex-col h-screen">
      <NavBarPlanner />
      <div className="my-8">
      <ProgressStep currentStep={2} totalSteps={3} />
      </div>
      <div className="flex flex-1">
        {/* Collapsible Sidebar */}
        <div className="w-full md:w-1/3 border-r overflow-y-auto border-gray-300 p-4">
          <h2 className="text-3xl font-semibold mb-4">Procurement Plans</h2>
          {/* Filters Section */}
          <div className="flex items-center mb-4">
            <img src={filter} alt="Filter" className="w-5 h-5 mr-2" />
            <span className="mr-2 font-bold">Filter By:</span>
            <input
              type="number"
              placeholder="Total Routes"
              value={filterRoutes}
              onChange={(e) => setFilterRoutes(e.target.value)}
              className="border p-1 rounded mr-2"
            />
            <input
              type="number"
              placeholder="Total Amount"
              value={filterAmount}
              onChange={(e) => setFilterAmount(e.target.value)}
              className="border p-1 rounded mr-2"
            />
            <button onClick={resetFilters} className="text-red-600">
              <img src={reset} alt="Reset Filter" className="inline w-5 h-5 mr-1" />
              Reset
            </button>
          </div>
          {/* Plans List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="cursor-pointer hover:bg-gray-100 text-lg p-2 rounded-md border"
                onClick={() => handlePlanClick(plan)}
              >
                <span className="font-bold">{plan.id}</span> - Total Routes: {plan.totalRoutes} | Total Amount: {plan.totalAmount} tons
                {selectedPlan?.id === plan.id && (
                  <ul className="ml-4 mt-2">
                    {plan.routes.map((route) => (
                      <li
                        key={route.id}
                        className="relative hover:bg-gray-100 text-lg p-1 rounded-md cursor-pointer"
                        onMouseEnter={() => setHoveredRoute(route)}
                        onMouseLeave={() => setHoveredRoute(null)}
                      >
                        Route {route.id}: From {route.from} to {route.to}
                        {hoveredRoute?.id === route.id && (
                          <div className="absolute left-48 top-0 ml-2 bg-white border border-gray-300 shadow-lg p-2 rounded-lg w-64 text-sm z-10">
                            <h3 className="font-bold text-center">Route Details</h3>
                            <p><strong>From:</strong> {hoveredRoute.from}</p>
                            <p><strong>To:</strong> {hoveredRoute.to}</p>
                            <p><strong>Amount:</strong> {hoveredRoute.amount} tons</p>
                            <p><strong>Cost:</strong> ${hoveredRoute.cost}</p>
                            <p><strong>Transport Unit:</strong> {hoveredRoute.transportUnit}</p>
                            <p><strong>Estimated Time:</strong> {hoveredRoute.estimatedTime}</p>
                            <button
                              onClick={() => window.location.href = '/procurement'}
                              className="mt-2 bg-blue-500 text-white p-1 rounded"
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
        {/* Main Content - Map Only */}
        <div className="w-full md:w-2/3 pl-4">
          <div className="mt-4 border rounded-lg h-full">
            <p className="text-center py-20 text-gray-400">Map will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
