import React from 'react'
import Image from 'next/image'
import s1 from '@/public/s1.jpg'
import b1 from '@/public/b1.jpg'
import { IoLocationSharp } from "react-icons/io5";
import RenderImages from './RenderImages'
import Link from 'next/link';

const Section2 = () => {
  return (
    <> 
    <section className="min-h-[70vh] w-10/12 max-w-7xl mx-auto mt-20 text-white shadow-sm rounded-t-3xl
    rounded-b-2xl px-6 py-10 flex flex-col  items-center justify-between gap-15" 
    data-aos="fade-up" data-aos-duration="3000">
    
     <header className='flex-col p-3 gap-5 text-white flex w-full md:gap-5 md:flex-row'>
     <h1 className='text-2xl w-full text-center md:text-left md:text-5xl md:w-1/2 h-auto'>Experience Earth like never before, Explore its best landscapes</h1>
     <div className='w-full text-center md:text-left flex flex-col md:w-1/2 h-auto gap-5'>
      <p className='text-sm md:text-lg text-gray-400'>
      Let our AI-powered travel planner design the perfect itinerary for you whether you're exploring
      ancient landmarks, relaxing on tropical beaches, or discovering hidden gems in bustling cities.
      Just tell us your preferences, and we'll create a personalized, efficient, and unforgettable
      travel experience tailored just for you.
     </p>
     <div className='ml-6 gap-2 md:ml-0 flex items-center  md:gap-3 '>
     <button className='bg-white cursor-pointer text-black rounded-full px-4 py-2'><Link href="/operation">Remind me</Link></button>
     <button className='border cursor-pointer border-gray-400 text-white rounded-full px-4 py-2'><Link href="/about">Learn more</Link></button>
     </div> 
     </div>  
     </header>


     <div className='w-full flex flex-col gap-5'>
      {/**top-div */}
      <div className='flex flex-col w-full lg:flex-row gap-10 p-2'>
         <div className='relative w-full lg:w-2/3 h-[40vh]'>
           <Image
           src={s1}
           alt='side long image'
           fill
           className='rounded-4xl object-cover'/>
             <div className='bottom-16 left-5 lg:bottom-5 border border-gray-700 lg:left-2 text-white px-3 py-1 rounded-2xl backdrop-blur-sm absolute z-10  flex flex-col gap-1'>
              <p className='text-2xl'>Wanna explore it ?</p>
              <p className='text-md'>Don't wait, go for it let us plan your trip !</p>
             </div>
             <button className='absolute z-10 bottom-6 right-3 backdrop-blur-2xl cursor-pointer text-white border rounded-full border-gray-400 px-2 py-1'>Let's Go</button>
         </div>
         <div className='relative w-full lg:w-1/3 h-[40vh]'>
           <Image
           src={b1}
           alt='side short image'
           fill
           className='rounded-4xl object-cover'/>
            <div className='absolute bottom-5 right-4 border border-gray-400 backdrop-blur-2xl rounded-full py-2 px-5 flex items-center gap-3'>
             <IoLocationSharp color='white' size={20}/> <p className='text-md text-white'>Rome,Italy</p>
            </div>
         </div>
      </div>
      {/**low-div */}
      <div className='flex flex-col w-full md:flex-row gap-10'>
      <RenderImages/> 
     </div>
     </div>






    </section>
    </>
  )
}

export default Section2
