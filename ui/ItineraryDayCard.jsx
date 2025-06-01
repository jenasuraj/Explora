"use client";

import { MdOutlineFreeBreakfast, MdDinnerDining, MdOutlineHiking } from "react-icons/md";
import { GiHotMeal } from "react-icons/gi";
import { BsPersonWalking } from "react-icons/bs";
import MealCard from "@/ui/MealCard";
import ActivityCard from "@/ui/ActivityCard";


const ItineraryDayCard = ({ dayKey, day, images, destination }) => {
  return (
    <div className="bg-black bg-opacity-90 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-100 border-b-2 border-gradient-to-r from-purple-500 to-pink-500 pb-2 mb-4">
        {dayKey}
      </h3>

      <ul className="space-y-4">
        <MealCard type="Breakfast" icon={MdOutlineFreeBreakfast} data={day.Breakfast} imageUrl={images.breakfast} destination={destination} />
        <MealCard type="Lunch" icon={GiHotMeal} data={day.Lunch} imageUrl={images.lunch} destination={destination} />
        <MealCard type="Dinner" icon={MdDinnerDining} data={day.Dinner} imageUrl={images.dinner} destination={destination} />
        <ActivityCard timeOfDay="Morning" icon={MdOutlineHiking} data={day["Morning Activity"]} imageUrl={images.morning} destination={destination} />
        <ActivityCard timeOfDay="Afternoon" icon={BsPersonWalking} data={day["Afternoon Activity"]} imageUrl={images.afternoon} destination={destination} />
      </ul>
    </div>
  );
};

export default ItineraryDayCard;
