import React from "react";
import review from "../../assets/Planner/review.png";
import map from "../../assets/Planner/map.png";
import plan from "../../assets/Planner/plan.png";

const ProgressStep = ({ currentStep }) => {
  return (
    <div className="flex justify-center">
      <ol className="flex items-center w-1/3 text-sm font-medium text-center text-gray-500 sm:text-base">
        <li
          className={`flex md:w-full items-center ${
            currentStep === 1 ? "text-blue-600" : ""
          } sm:after:content-[''] after:w-full after:h-1 after:border-b-2 after:border-gray-300 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 text-xl whitespace-nowrap">
            <img
              src={plan}
              alt="Input Field"
              className="w-4 h-4 sm:w-5 sm:h-5 me-2.5"
            />
            Input Field
          </span>
        </li>
        <li
          className={`flex md:w-full items-center ${
            currentStep === 2 ? "text-blue-600" : ""
          } after:content-[''] after:w-full after:h-1 after:border-b-2 after:border-gray-300 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}
        >
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 text-xl after:text-gray-200">
            <img
              src={map}
              alt="Routes"
              className="w-44 h-4 sm:w-5 sm:h-5 me-2.5"
            />
            Routes
          </span>
        </li>
        <li
          className={`flex items-center text-xl ${
            currentStep === 3 ? "text-blue-600" : ""
          }`}
        >
          <img
            src={review}
            alt="Review"
            className="w-4 h-4 sm:w-5 sm:h-5 me-2.5"
          />
          Review
        </li>
      </ol>
    </div>
  );
};

export default ProgressStep;
