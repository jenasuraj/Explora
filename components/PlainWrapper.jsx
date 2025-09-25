"use client"
import DateSection from '@/components/output/DateSection';
import DaySection from '@/components/output/DaySection';
import React from 'react'
import { useState } from 'react';

const PlainWrapper = ({plainData}) => {
      const [showIndex,setShowIndex] = useState(null);
      const [showDate,setShowDate] = useState(false);
  return (
    <>
<section className='flex flex-col md:flex-row w-full min-h-screen p-2 gap-5'>
      <DateSection slugItem={plainData} setShowDate={setShowDate} setShowIndex={setShowIndex} showDate={showDate} showIndex={showIndex} />
      <DaySection  slugItem={plainData} setShowDate={setShowDate} setShowIndex={setShowIndex} showDate={showDate} showIndex={showIndex} />
</section>
    </>
  )
}

export default PlainWrapper
