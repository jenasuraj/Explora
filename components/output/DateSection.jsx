"use client"

import React from 'react'
import { useState } from 'react'

const DateSection = ({final_data,setShowDates,setShowIndex}) => {
    const [buttonColoured,setButtonColoured] = useState(null) 
    const separatorAdder = (data)=>{
    //day1 -> day-1
    let final = ""
    const updated_data = data.split('')
    for(let i=0;i<updated_data.length;i++)
    {
      final = final+updated_data[i]
      if (updated_data[i].toLowerCase() == 'y')
      {
        final = final+' - '
      }
    }
    return final
  }

  const selectDay = (index)=>{
  if(buttonColoured == index)
  {
    setButtonColoured(null)
    setShowDates(false)
  }
  else{
    setButtonColoured(index)
    setShowDates(true)
    setShowIndex(index)
  }
  }

  return (
    <>
    <section className="w-full min-h-[10vh] bg-white rounded-xl border border-gray-200 shadow-lg p-4 lg:w-1/3 gap-2">
       {final_data.days.map((item, index) => (
        <div onClick={()=>selectDay(index)}
         key={index}
         className={`${buttonColoured == index ? 
         'shadow-md border border-gray-300 inline-block p-4 ml-2 mt-2 rounded-sm  transition-all duration-200 transform hover:scale-105 hover:bg-gray-500 active:scale-95 cursor-pointer bg-gray-500 text-white'
         : 'shadow-md border border-gray-300 inline-block p-4 ml-2 mt-2 rounded-sm bg-white transition-all duration-200 transform hover:scale-105 hover:bg-blue-100 active:scale-95 cursor-pointer'}`}>
           {separatorAdder(item.day)}
          </div> 
          ))}
        </section>
    </>
  )
}

export default DateSection