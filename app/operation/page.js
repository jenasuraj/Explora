"use client"

import { useState } from 'react';
import React from 'react';
import Chatbot from '@/components/chatbot-ui/Chatbot';
import DateSection from '@/components/output/DateSection';
import DaySection from '@/components/output/DaySection';


const Page = () => {
  const [firstResponse, setFirstResponse] = useState(false);
  const [showIndex,setShowIndex] = useState(null)
  const [finalData,setFinalData] = useState('')
  const [showDates,setShowDates] = useState(false)

return (
<section className='w-full min-h-screen'>
    <Chatbot firstResponse={firstResponse} setFirstResponse={setFirstResponse}/>
    {firstResponse &&(
      <div className='w-full min-h-screen bg-black'>
        <DateSection  finalData={finalData} setShowDates={setShowDates} setShowIndex={setShowIndex}/>
        <DaySection/>
      </div>
    )}         
</section>
  );
};

export default Page;