import React, { useState } from 'react';
import { FaMountainSun } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineFreeBreakfast, MdOutlineLunchDining, MdDinnerDining } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { PiClockAfternoonLight } from "react-icons/pi";
import { IoCloudyNight } from "react-icons/io5";
import { MdNightlightRound } from "react-icons/md";

const FetchPlan = ({ finalData, showIndex }) => {
  const [showPlan, setShowPlan] = useState(false);
  
  // Check if data is available
  if (!finalData || !finalData.days || !finalData.days[showIndex] || !finalData.days[showIndex].plan) {
    return (
      <button
        className="bg-gray-700 w-fit px-5 py-3 border border-gray-600 rounded-full cursor-pointer gap-2 flex justify-center items-center  
        hover:bg-gray-600 transition-all duration-200 text-gray-300 font-medium opacity-70"
        disabled
      >
        <FaMountainSun className="text-orange-400" /> No Plan Available
      </button>
    );
  }
  
  const plan = finalData.days[showIndex].plan;

  return (
    <>
      {showPlan && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowPlan(false)}
        >
          <div 
            className="bg-gray-900 w-full max-w-2xl max-h-[85vh] rounded-xl shadow-2xl border border-gray-700 p-6 relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaMountainSun className="text-orange-400" />
                Daily Itinerary
              </h2>
              <button
                onClick={() => setShowPlan(false)}
                className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 rounded-full transition-colors"
              >
                <RxCross1 size={22} />
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4 relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-blue-500/30 z-0"></div>
              
              {/* Activity blocks */}
              <div className="flex items-start relative z-10">
                <div className="bg-blue-500 rounded-full p-2 flex-shrink-0 mt-1 shadow-lg">
                  <MdOutlineFreeBreakfast size={18} className="text-white" />
                </div>
                <div className="ml-4 flex-1 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-blue-300">Breakfast</h3>
                  <p className="text-gray-300 mt-1">{plan.breakfast}</p>
                </div>
              </div>

              <div className="flex items-start relative z-10">
                <div className="bg-orange-500 rounded-full p-2 flex-shrink-0 mt-1 shadow-lg">
                  <FaSun size={18} className="text-white" />
                </div>
                <div className="ml-4 flex-1 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-orange-300">Morning Activity</h3>
                  <p className="text-gray-300 mt-1">{plan.morning_activity}</p>
                </div>
              </div>

              <div className="flex items-start relative z-10">
                <div className="bg-green-500 rounded-full p-2 flex-shrink-0 mt-1 shadow-lg">
                  <MdOutlineLunchDining size={18} className="text-white" />
                </div>
                <div className="ml-4 flex-1 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-green-300">Lunch</h3>
                  <p className="text-gray-300 mt-1">{plan.lunch}</p>
                </div>
              </div>

              <div className="flex items-start relative z-10">
                <div className="bg-indigo-500 rounded-full p-2 flex-shrink-0 mt-1 shadow-lg">
                  <PiClockAfternoonLight size={18} className="text-white" />
                </div>
                <div className="ml-4 flex-1 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-indigo-300">Afternoon Activity</h3>
                  <p className="text-gray-300 mt-1">{plan.afternoon_activity}</p>
                </div>
              </div>

              <div className="flex items-start relative z-10">
                <div className="bg-purple-500 rounded-full p-2 flex-shrink-0 mt-1 shadow-lg">
                  <IoCloudyNight size={18} className="text-white" />
                </div>
                <div className="ml-4 flex-1 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-purple-300">Evening</h3>
                  <p className="text-gray-300 mt-1">{plan.evening}</p>
                </div>
              </div>

              <div className="flex items-start relative z-10">
                <div className="bg-blue-700 rounded-full p-2 flex-shrink-0 mt-1 shadow-lg">
                  <MdNightlightRound size={18} className="text-white" />
                </div>
                <div className="ml-4 flex-1 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-blue-300">Night Activity</h3>
                  <p className="text-gray-300 mt-1">{plan.night_activity}</p>
                </div>
              </div>

              <div className="flex items-start relative z-10">
                <div className="bg-red-500 rounded-full p-2 flex-shrink-0 mt-1 shadow-lg">
                  <MdDinnerDining size={18} className="text-white" />
                </div>
                <div className="ml-4 flex-1 bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-red-300">Dinner</h3>
                  <p className="text-gray-300 mt-1">{plan.dinner}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-700 text-center">
              <p className="text-gray-400 text-sm">
                Enjoy your day of exploration! 🌄
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Button to show plan */}
      <button
        className="bg-gray-800 w-fit px-5 py-3 border border-gray-700 rounded-full cursor-pointer gap-2 flex justify-center items-center  
        hover:bg-gray-700 hover:shadow-lg transition-all duration-200 text-gray-200 hover:text-white font-medium shadow-md"
        onClick={() => setShowPlan(true)}>
        <FaMountainSun className="text-orange-400" /> View Daily Plan
      </button>
    </>
  );
};

export default FetchPlan;