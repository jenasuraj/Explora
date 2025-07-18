"use client";
import React from 'react'
import { WiDaySunny } from "react-icons/wi";
import { GrLocation } from "react-icons/gr";
import { MdFlight } from "react-icons/md";
import { PiBroadcast, PiKeyReturnLight } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import FetchImages from './FetchImages';
import FetchHotels from './FetchHotels';
import FetchRestaurant from './FetchRestaurant';


const DaySection = ({ showDates, final_data, showIndex }) => {
  const dayData = final_data.days[showIndex];
  

  return (
    <>
      {!showDates ? (
        <section className="w-full min-h-[60vh] bg-white rounded-xl border border-gray-200 shadow-lg p-6 lg:w-2/3 flex flex-col gap-10">
          {/* Header Section */}
          <header className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm flex flex-col gap-4">
            <p className="flex items-center gap-3 text-gray-700">
              <MdFlight size={20} />
              Starting point:
              <span className="font-semibold">{final_data.starting_point}</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <PiBroadcast size={20} />
              Total travelling distance:
              <span className="font-semibold">{final_data.total_distance_km} km</span>
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <PiKeyReturnLight size={20} />
              Returning Route:
              <span className="font-semibold">{final_data.return_route}</span>
            </p>
          </header>

          {/* Tips Section */}
          <ul className="flex flex-wrap gap-4">
            {final_data.tips.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700 w-full sm:w-[calc(50%-0.5rem)]"
              >
                <SiTicktick color="green" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="w-full flex flex-col gap-6 bg-white p-4 rounded-xl shadow border border-gray-200">
          {/* Day Title */}
          <p className="inline-flex w-fit items-center gap-3 px-4 py-2 bg-gray-600 text-white rounded-full shadow text-base">
            <WiDaySunny size={30} color="yellow" />
            {dayData.day}
          </p>

          {/* Places Section */}
          {dayData.places.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-4 bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm">
              {/* Image */}
            <div className="w-full md:w-1/3">
           <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden">
            <FetchImages item={item.name}/>
            </div>
           </div>


              {/* Text Info */}
              <div className="flex flex-col gap-2 w-full md:w-2/3">
                <p className="inline-flex w-fit items-center gap-2 px-3 py-1 border border-gray-300 rounded-full bg-white text-gray-800">
                  <GrLocation size={18} />
                  {item.name}
                </p>
                <div className='flex gap-2 mt-3'>
                <FetchHotels/> 
                <FetchRestaurant/> 
                  
                </div>
                <p className="text-gray-600 mt-5">{item.description}</p>
                {item.distance_from_previous_km && (
                  <p className="text-sm text-gray-500">
                    Distance from previous place:{" "}
                    <span className="font-semibold text-gray-800">
                      {item.distance_from_previous_km} km
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default DaySection;
