import React, { useState } from "react";
import Logo from "../../assets/Home/Logo/Logo.png";
import NavBarPlanner from "../../Components/NavBarPlanner/NavBarPlanner";
import filter from "../../assets/Admin/filter.png";
import reset from "../../assets/Admin/reset.png";

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
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [filterRoutes, setFilterRoutes] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    setSelectedRoute(null); // Reset selected route when a new plan is clicked
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilterRoutes("");
    setFilterAmount("");
  };

  // Filter plans based on total routes and total amount
  const filteredPlans = plansData.filter((plan) => {
    const matchesRoutes = filterRoutes
      ? plan.totalRoutes === parseInt(filterRoutes)
      : true;
    const matchesAmount = filterAmount
      ? plan.totalAmount === parseInt(filterAmount)
      : true;
    return matchesRoutes && matchesAmount;
  });

  // Handle Choose button click
  const handleChoose = () => {
    if (selectedRoute) {
      alert(
        `You chose route: From ${selectedRoute.from} to ${selectedRoute.to}`
      );
    }
  };

  // Handle Cancel button click
  const handleCancel = () => {
    setSelectedRoute(null);
    setSelectedPlan(null);
  };

  return (
    <div>
      <NavBarPlanner />
      <div className="flex mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-300 pr-4">
          <h2 className="text-3xl font-semibold mb-4">Procurement Plans</h2>

          {/* Filters Section */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
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
                <img
                  src={reset}
                  alt="Reset Filter"
                  className="inline w-5 h-5 mr-1"
                />
                Reset
              </button>
            </div>
          </div>

          {/* Plans List */}
          <ul>
            {filteredPlans.map((plan) => (
              <li key={plan.id}>
                <div
                  className="cursor-pointer hover:bg-gray-100 text-lg p-2 rounded-md"
                  onClick={() => handlePlanClick(plan)}
                >
                  <span className="font-bold">{plan.id}</span> - Total Routes:{" "}
                  {plan.totalRoutes} | Total Amount: {plan.totalAmount} tons
                </div>
                {selectedPlan?.id === plan.id && (
                  <ul className="ml-4 mt-2">
                    {plan.routes.map((route) => (
                      <li
                        key={route.id}
                        className="hover:bg-gray-100 text-lg p-1 rounded-md cursor-pointer"
                        onClick={() => handleRouteClick(route)}
                      >
                        Route {route.id}: From {route.from} to {route.to}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content - Map and Route Details */}
        <div className="w-2/3 pl-4">
          <h2 className="text-2xl font-semibold mb-4">Route Details</h2>
          {selectedRoute ? (
            <div className="mb-6 text-lg">
              <h3 className="font-bold">Route Information:</h3>
              <p>
                <strong>From:</strong> {selectedRoute.from}
              </p>
              <p>
                <strong>To:</strong> {selectedRoute.to}
              </p>
              <p>
                <strong>Amount:</strong> {selectedRoute.amount} tons
              </p>
              <p>
                <strong>Cost:</strong> ${selectedRoute.cost}
              </p>
              <p>
                <strong>Transport Unit:</strong> {selectedRoute.transportUnit}
              </p>
              <p>
                <strong>Estimated Time:</strong> {selectedRoute.estimatedTime}
              </p>

              {/* Choose and Cancel Buttons */}
              <div className="mt-4">
                <button
                  onClick={handleChoose}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                >
                  Choose
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a route to see the details.</p>
          )}

          {/* Placeholder for the Map */}
          <div className="mt-4 border rounded-lg h-96">
            <p className="text-center py-20 text-gray-400">
              Map will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
