"use client";
import React, { useState } from 'react';

const DateSection = ({ finalData, setShowDate, setShowIndex }) => {
  const [buttonColoured, setButtonColoured] = useState(null);

  const separatorAdder = (data) => {
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

  if (!finalData || !finalData.days) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-lg p-4 lg:w-1/3 flex flex-wrap gap-2">
      {finalData.days.map((item, index) => (
        <div
          onClick={() => selectDay(index)}
          key={index}
          className={`${
            buttonColoured === index
              ? 'bg-gray-500 text-white'
              : 'bg-white text-gray-800 hover:bg-blue-100'
          } shadow-md border border-gray-300 inline-block p-3 m-1 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer`}
          role="button"
          aria-label={`Select ${item.day}`}
        >
          {separatorAdder(item.day)}
        </div>
      ))}
    </div>
  );
};

export default DateSection;