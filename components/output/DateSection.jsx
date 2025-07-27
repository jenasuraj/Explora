"use client";
import React, { useState, useEffect } from 'react';

const DateSection = ({ finalData, setShowDate, setShowIndex }) => {
  const [buttonColoured, setButtonColoured] = useState(null);

  //console.log(typeof(finalData))
  //console.log("🟢 In DateSection, finalData:", finalData);

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

  if (!finalData || !Array.isArray(finalData.days)) {
    console.warn("⚠️ finalData.days is invalid or missing");
    return <p className="text-white p-4">No data to display.</p>;
  }

  return (
    <div className="w-full min-h-[10vh] bg-white rounded-xl border border-gray-200 shadow-lg p-4 lg:w-1/3 gap-2">
    {finalData.days.map((item, index) => (
        <div onClick={()=>selectDay(index)}
         key={index}
         className={`${buttonColoured == index ? 
         'shadow-md border border-gray-300 inline-block p-4 ml-2 mt-2 rounded-sm  transition-all duration-200 transform hover:scale-105 hover:bg-gray-500 active:scale-95 cursor-pointer bg-gray-500 text-white'
         : 'shadow-md border border-gray-300 inline-block p-4 ml-2 mt-2 rounded-sm bg-white transition-all duration-200 transform hover:scale-105 hover:bg-blue-100 active:scale-95 cursor-pointer'}`}>
           {separatorAdder(item.day)}
          </div> 
          ))}
    </div>
  );
};

export default DateSection;
