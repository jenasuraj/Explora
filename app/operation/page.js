"use client"

import { useState } from 'react';
import React from 'react';
import Chatbot from '@/components/chatbot-ui/Chatbot';
import DateSection from '@/components/output/DateSection';
import DaySection from '@/components/output/DaySection';


const Page = () => {
  const [firstResponse, setFirstResponse] = useState(false);
  const [showIndex,setShowIndex] = useState(null)
  const [finalData,setFinalData] = useState({})
  const [showDate,setShowDate] = useState(false)

//console.log("Backend Response:", finalData);
console.log("i'm in parent and", "showDate:", showDate, "showIndex:", showIndex);
return (
<section className='w-full min-h-screen'>
    <Chatbot firstResponse={firstResponse} setFirstResponse={setFirstResponse} finalData={finalData} setFinalData={setFinalData}/>
    {firstResponse &&(
      <div className='w-full min-h-screen flex flex-col lg:flex-row p-6 gap-5'>
        <DateSection  finalData={finalData} setShowDate={setShowDate} setShowIndex={setShowIndex}/>
        <DaySection finalData={finalData} showDate={showDate} showIndex={showIndex}/>
      </div>
    )}         
</section>
  );
};

export default Page;