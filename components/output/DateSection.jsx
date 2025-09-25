"use client";
import React, { useState, useEffect } from 'react';

const DateSection = ({ finalData, setShowDate, setShowIndex,slugItem }) => {

  const [buttonColoured, setButtonColoured] = useState(null);

  const separatorAdder = (data) => {
    if (typeof data !== 'string') return 'Unnamed Day';
    let final = "";
    const updated_data = data.split('');
    for (let i = 0; i < updated_data.length; i++) {
      final += updated_data[i];
      if (updated_data[i].toLowerCase() === 'y') {
        final += ' - '; 
      }
    }
    return final;
  };


  const selectDay = (index) => {
    if (buttonColoured === index) {
      setButtonColoured(null);
      setShowDate(false);
      setShowIndex(null);
    } else {
      setButtonColoured(index);
      setShowDate(true);
      setShowIndex(index);
    }
  };



  return (
    <>
    {finalData && finalData.days ?(
      <div className="w-full min-h-[10vh] bg-gray-900 rounded-xl border border-gray-700 shadow-lg p-3 md:p-5 lg:w-1/3">
      <div className="mb-4 border-b border-gray-700 pb-3">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Itinerary Days
        </h2>
        <p className="text-sm text-gray-400 mt-1">Select a day to view details</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {finalData.days.map((item, index) => (
          <div 
            key={index}
            onClick={() => selectDay(index)}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
              buttonColoured === index 
                ? 'bg-blue-900/30 border-blue-500 shadow-md shadow-blue-500/20' 
                : 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                  buttonColoured === index ? 'bg-blue-400' : 'bg-gray-600'
                }`}></div>
                <span className={`font-medium ${
                  buttonColoured === index ? 'text-blue-200' : 'text-gray-300'
                }`}>
                  {separatorAdder(item.day)}
                </span>
              </div>
              
              {buttonColoured === index && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            {buttonColoured === index && item.places && (
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {item.places.length} location{item.places.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {finalData.days.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2">No days planned yet</p>
        </div>
      )}
    </div>
    ):slugItem && slugItem.days ?(
      <div className="w-full min-h-[10vh] bg-gray-900 rounded-xl border border-gray-700 p-5 shadow-lg  lg:w-1/3">
      <div className="mb-4 border-b border-gray-700 pb-3">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Itinerary Days
        </h2>
        <p className="text-sm text-gray-400 mt-1">Select a day to view details</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {slugItem.days.map((item, index) => (
          <div 
            key={index}
            onClick={() => selectDay(index)}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] ${
              buttonColoured === index 
                ? 'bg-blue-900/30 border-blue-500 shadow-md shadow-blue-500/20' 
                : 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                  buttonColoured === index ? 'bg-blue-400' : 'bg-gray-600'
                }`}></div>
                <span className={`font-medium ${
                  buttonColoured === index ? 'text-blue-200' : 'text-gray-300'
                }`}>
                  {separatorAdder(item.day)}
                </span>
              </div>
              
              {buttonColoured === index && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            {buttonColoured === index && item.places && (
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {item.places.length} location{item.places.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    ):(
      <p>Nothing</p>
    )}
      </>
  );
};
export default DateSection;