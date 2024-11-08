import { useState } from "react";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import "./Optimization.css";
import { useSelector } from "react-redux";
import Map from "../../Components/Map/Map";

const Optimization = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [filterRoutes, setFilterRoutes] = useState("");
  const [filterAmount, setFilterAmount] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const { optimizationResult } = useSelector((state) => state.optimize);

  const transformRoutes = (routes) => {
    if (!routes) return null;
    return {
      totalRoutes: routes.length,
      totalAmount: routes.reduce((sum, route) => sum + route.weight, 0),
      routes: routes.map((route) => ({
        id: route.route_id,
        from: route.routes[0][0],
        to: route.routes[0][1],
        demand: route.weight,
        vehicle: route.vehicle,
        weight: route.weight,
        driver_cost: route.driver_cost,
        fuel_cost: route.fuel_cost,
        goods_cost: route.goods_cost,
        total_cost: route.total_cost,
        travel_hours: route.travel_hours,
        travel_kms: route.travel_kms,
      })),
    };
  };

  const deliveryPlans = [];

  if (optimizationResult?.solutions?.genetic_algorithm) {
    deliveryPlans.push({
      title: "Delivery Plan 1",
      algorithm: "Genetic Algorithm",
      data: transformRoutes(optimizationResult.solutions.genetic_algorithm),
    });
  }

  if (optimizationResult?.solutions?.graph_neural_network) {
    deliveryPlans.push({
      title: "Delivery Plan 2",
      algorithm: "Graph Neural Network",
      data: transformRoutes(optimizationResult.solutions.graph_neural_network),
    });
  }

  if (optimizationResult?.solutions?.linear_algorithm) {
    deliveryPlans.push({
      title: optimizationResult.solutions.graph_neural_network
        ? "Delivery Plan 3"
        : "Delivery Plan 2",
      algorithm: "Linear Algorithm",
      data: transformRoutes(optimizationResult.solutions.linear_algorithm),
    });
  }

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
  };

  const resetFilters = () => {
    setFilterRoutes("");
    setFilterAmount("");
    setSelectedRoute(null);
  };

  const filteredPlans = deliveryPlans.filter((plan) => {
    const matchesRoutes = filterRoutes
      ? plan.data.totalRoutes === parseInt(filterRoutes)
      : true;
    const matchesAmount = filterAmount
      ? plan.data.totalAmount === parseInt(filterAmount)
      : true;
    return matchesRoutes && matchesAmount;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="lg:hidden p-4 flex justify-end">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow"
        >
          {isSidebarOpen ? "Hide Plans" : "Show Plans"}
        </button>
      </div>
      <div className="flex flex-1 flex-col lg:flex-row relative">
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block w-full lg:w-1/3 xl:w-1/4 overflow-y-auto bg-white shadow-lg transition-all duration-300 lg:sticky lg:top-16`}
        >
          <h1 className="text-2xl font-bold my-4 text-center">
            Optimization Results
          </h1>
          <p className="mb-4 px-4 text-center">
            Plan ID: {optimizationResult?.plan_id}
          </p>
          <div className="sticky top-0 bg-white z-10 p-4 border-b">
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaFilter className="text-primary w-4 h-4 mr-2" />
                  <span className="font-semibold text-gray-700">
                    Filter Plans
                  </span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-red-500 hover:text-red-600 text-sm flex items-center"
                >
                  <GrPowerReset className="w-3 h-3 mr-1" />
                  Reset
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Total Routes
                  </label>
                  <input
                    type="number"
                    value={filterRoutes}
                    onChange={(e) => setFilterRoutes(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    min="0"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Total Amount
                  </label>
                  <input
                    type="number"
                    value={filterAmount}
                    onChange={(e) => setFilterAmount(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {filteredPlans.map((plan) => (
              <div
                key={plan.title}
                className={`p-4 rounded-lg border cursor-pointer hover:bg-gray-100 ${
                  expandedPlan === plan.title ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() =>
                  setExpandedPlan(
                    expandedPlan === plan.title ? null : plan.title
                  )
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-gray-800">
                    {plan.title}
                  </span>
                  {expandedPlan === plan.title ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </div>
                <span className="text-sm text-primary">{plan.algorithm}</span>
                <div className="mt-2 text-sm text-gray-600 flex gap-4">
                  Total Routes: {plan.data.totalRoutes}
                </div>
                {expandedPlan === plan.title && (
                  <ul className="ml-4 mt-3 space-y-2">
                    {plan.data.routes.map((route, index) => (
                      <li
                        key={route.id}
                        className="relative bg-gray-50 p-2 rounded-lg border hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleRouteClick(route)}
                      >
                        <div className="flex justify-between">
                          <span>
                            Route {index + 1}: {route.id}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-2/3 xl:w-3/4 p-4 flex-1">
          <div className="w-full h-[calc(100vh-8rem)] lg:h-[calc(100vh-1rem)] rounded-lg overflow-hidden shadow-lg">
            <Map selectedRoute={selectedRoute} selectedPlan={deliveryPlans} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optimization;
