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
  const plan = finalData.days[showIndex].plan;

  return (
    <>
      {showPlan && (
        <div className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm flex mt-10 items-center justify-center">
          <div className="bg-white w-[90%] min-h-[70vh] md:w-2/3 rounded-md shadow-xl border border-gray-200 p-6 relative z-50 animate-fadeIn space-y-4">
            
            {/* Close button */}
            <button
              onClick={() => setShowPlan(false)}
              className="absolute top-1 right-1 text-white text-md font-bold cursor-pointer border border-red-600 inline-block bg-red-500 ">
              <RxCross1 size={20} />
            </button>

            {/* Activity blocks */}
            <p className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 shadow-sm">
              <MdOutlineFreeBreakfast size={22} className="text-yellow-700" />
              <span className="font-medium">Breakfast:</span> {plan.breakfast}
            </p>

            <p className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 shadow-sm">
              <FaSun size={22} className="text-orange-500" />
              <span className="font-medium">Morning Activity:</span> {plan.morning_activity}
            </p>

            <p className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 shadow-sm">
              <MdOutlineLunchDining size={22} className="text-green-600" />
              <span className="font-medium">Lunch:</span> {plan.lunch}
            </p>

            <p className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 shadow-sm">
              <PiClockAfternoonLight size={22} className="text-indigo-600" />
              <span className="font-medium">Afternoon Activity:</span> {plan.afternoon_activity}
            </p>

            <p className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 shadow-sm">
              <IoCloudyNight size={22} className="text-purple-600" />
              <span className="font-medium">Evening:</span> {plan.evening}
            </p>

            <p className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 shadow-sm">
              <MdNightlightRound size={22} className="text-blue-700" />
              <span className="font-medium">Night Activity:</span> {plan.night_activity}
            </p>

            <p className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 shadow-sm">
              <MdDinnerDining size={22} className="text-red-600" />
              <span className="font-medium">Dinner:</span> {plan.dinner}
            </p>
          </div>
        </div>
      )}

      {/* Button to show plan */}
      <p
        className="w-fit h-auto px-5 py-2 border border-gray-400 rounded-full cursor-pointer gap-2 flex justify-center items-center  
        hover:bg-gray-100 hover:shadow-md transition-all duration-200 text-gray-800 font-medium"
        onClick={() => setShowPlan(!showPlan)}
      >
        <FaMountainSun className="text-orange-400" /> See Trip
      </p>
    </>
  );
};

export default FetchPlan;
