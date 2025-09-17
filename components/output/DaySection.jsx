"use client";
import React from 'react';
import { useState } from 'react';
import { WiDaySunny } from "react-icons/wi";
import { GrLocation } from "react-icons/gr";
import { MdFlight } from "react-icons/md";
import { PiBroadcast, PiKeyReturnLight } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import FetchImages from './FetchImages';
import FetchPlan from './FetchPlan';
import { IoCheckmarkDone } from "react-icons/io5";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from 'axios';

const DaySection = ({ slugItem, showDate, finalData, showIndex }) => {
  const [approved, setApproved] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');

  // Determine which data source to use
  const data = finalData || slugItem; //this is called fallback logic or default param pattern
  
  if (!data || !data.days) {
    return null;
  }

  let dayData = null;
  if (showIndex !== null && data.days[showIndex]) {
    dayData = data.days[showIndex];
  }
  
  const handleSubmit = async () => {
    setLoading(true);
    if (approved) {
      await axios.delete('/api/crud', { data: { id: id } });
      setApproved(false);
      setId('');
    } else {
      try {
        const response = await axios.post('/api/crud', {
          finalData: data,
          email: session?.user?.email,
          place: data.starting_point
        });
        if (response.data.message) {
          setApproved(true);
          setId(response.data.message);
        }
      } catch (err) {
        console.log("error sending data to db");
      }
    }
    setLoading(false);
  };

  return (
    <>
      {!showDate ? (
        <section className="w-full min-h-[50vh] bg-gray-900 rounded-xl border border-gray-700 shadow-lg p-6 lg:w-2/3 flex flex-col gap-6">
          <header className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-sm flex flex-col gap-5">
            <p className="flex items-center gap-3 text-gray-200">
              <MdFlight size={22} className="text-blue-400" />
              Starting point:
              <span className="font-semibold text-white">{data.starting_point}</span>
            </p>
            <p className="flex items-center gap-3 text-gray-200">
              <PiBroadcast size={22} className="text-purple-400" />
              Total travelling distance:
              <span className="font-semibold text-white">{data.total_distance_km} km</span>
            </p>
            <p className="flex items-center gap-3 text-gray-200">
              <PiKeyReturnLight size={22} className="text-green-400" />
              Returning Route:
              <span className="font-semibold text-white">{data.return_route}</span>
            </p>
          </header>
          
          <div className="mt-2">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <SiTicktick className="text-green-400" />
              Travel Tips
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.tips && data.tips.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 hover:bg-gray-750 transition-colors"
                >
                  <SiTicktick className="text-green-400 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="w-full flex flex-col gap-6 bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
          {dayData ? (
            <>
              <div className='flex flex-wrap items-center gap-4 mb-4'>
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-gray-800 text-white rounded-full shadow border border-gray-700">
                  <WiDaySunny size={28} className="text-yellow-400" />
                  <span className="font-medium">{dayData.day}</span>
                </div>
                
                <FetchPlan finalData={data} showIndex={showIndex} />
                
               {!slugItem &&(
                                <button 
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full shadow text-base font-medium transition-all ${
                    approved 
                      ? "bg-red-700 hover:bg-red-600 text-white" 
                      : "bg-blue-700 hover:bg-blue-600 text-white"
                  } ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : approved ? (
                    <>
                      <IoCheckmarkDone size={20} />
                      Approved
                    </>
                  ) : (
                    "Approve Plan"
                  )}
                </button>
               )}
              </div>  
              
              <div className="grid gap-5">
                {dayData.places && dayData.places.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-6 bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-md hover:bg-gray-750 transition-colors"
                  >
                    <div className="w-full md:w-2/5">
                      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-gray-700 shadow">
                        <FetchImages item={item.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-80"></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 w-full md:w-3/5">
                      <div className='flex flex-wrap items-center gap-3'>
                        <p className="inline-flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-full bg-gray-700 text-white shadow-sm">
                          <GrLocation size={18} className="text-blue-400" />
                          {item.name}
                        </p>
                        
                        {item.distance_from_previous_km && (
                          <div className="inline-flex items-center px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300 border border-gray-600">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            {item.distance_from_previous_km} km from previous
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-gray-300 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <div className="text-5xl mb-4">🌄</div>
              <p className="text-lg">No data available for this day.</p>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default DaySection;