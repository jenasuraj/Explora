"use client";

import DateSection from '@/components/output/DateSection';
import DaySection from '@/components/output/DaySection';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';


const Page = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  let final_data = null;
  const [showDates,setShowDates] = useState(false)
  const [showIndex,setShowIndex] = useState(null)
  try {
    if (data) {
      final_data = JSON.parse(data);
      //console.log(final_data);
    }
  } catch (error) {
    console.error('Invalid JSON:', error);
  }

  if (!final_data) {
    return <p>No data found or data is invalid.</p>;
  }


  return (
    <>
      <section className="w-full min-h-screen flex flex-col gap-5 p-6 lg:flex-row ">
       <DateSection final_data={final_data} setShowDates={setShowDates} setShowIndex={setShowIndex}/>
       <DaySection final_data={final_data} showDates={showDates} setShowIndex={setShowIndex} showIndex={showIndex}/> 
      </section>
    </>
  );
};

export default Page;
