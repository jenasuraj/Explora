import React from 'react'
import Image from 'next/image'
import { ImSearch } from "react-icons/im";
import h1 from '@/public/h1.jpg'
import h2 from '@/public/h2.jpg'
import h3 from '@/public/h3.jpg'
import { FaLocationDot } from "react-icons/fa6";
import { MdStar } from "react-icons/md";

const hotels = [
  {"hotel":h1,"place":"Capella, Bangkok","rate":"4.5"},
  {"hotel":h2,"place":"Aman Tokyo, Tokyo","rate":"4.1"},
  {"hotel":h3,"place":"Upper house, Hongkong","rate":"4.7"},
]

const Section3 = () => {
return (
<>
<section className="min-h-[70vh] w-11/12 sm:w-10/12 max-w-7xl mx-auto mt-10 text-white shadow-sm rounded-t-3xl rounded-b-2xl px-4 sm:px-6 py-8 sm:py-10 flex flex-col items-center justify-center gap-6 sm:gap-10" data-aos="fade-up">
<header className='text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center'>
  <p>A Selection Of Exceptional Villas <br className="hidden sm:block" /> 
  And hotels</p>
</header>

<div className='flex flex-col sm:flex-row items-center w-full max-w-4xl gap-2 sm:gap-0 p-2'>
  <input type="text" placeholder='Date' className='w-full px-4 sm:px-5 py-3 sm:rounded-l-full border border-gray-600 text-sm sm:text-base'/>
  <input type="text" placeholder='Budget' className='w-full px-4 sm:px-5 py-3 border border-gray-600 text-sm sm:text-base'/>
  <input type="text" placeholder='Place' className='w-full px-4 sm:px-5 py-3 border border-gray-600 text-sm sm:text-base'/>
  <button className='w-full sm:w-auto px-4 sm:px-5 py-3 sm:rounded-r-full bg-white text-black border flex items-center justify-center border-gray-600 text-sm sm:text-base'>
    <ImSearch color='black' size={20} className="sm:size-[25px]"/>
  </button>
</div>

<div className='w-full h-auto flex flex-col sm:flex-row gap-4 sm:gap-5 p-3 sm:p-5'>
{hotels.map( (item,index)=>{
  return(
    <div key={index} className='relative w-full sm:w-1/3 h-[35vh] sm:h-[40vh] md:h-[45vh]'>
     <Image
     fill
     src={item.hotel}
     alt='hotel image'
     className='rounded-2xl sm:rounded-3xl object-cover'
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
     />
     <div className='rounded-full gap-1 sm:gap-2 flex items-center absolute bottom-3 sm:bottom-5 left-2 sm:left-3 px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-2xl text-xs sm:text-sm'>
       <FaLocationDot size={16} className="sm:size-[20px]" color='white'/> 
       <span className="truncate">{item.place}</span>
     </div>
     <div className='rounded-full gap-1 sm:gap-2 bg-black/20 flex items-center absolute top-3 sm:top-5 right-2 sm:right-3 px-2 sm:px-3 py-1 backdrop-blur-2xl text-xs sm:text-sm'>
       <MdStar color='yellow' size={16} className="sm:size-[20px]"/>{item.rate}
     </div>
    </div>
  )
})}
</div>

{/* AI Description Paragraph */}
<div className="w-full mt-6 px-6 sm:px-0">
    <p className="text-gray-400 text-lg  px-6 text-center leading-relaxed">
      Our advanced AI technology doesn't just help you find beautiful destinations—it intelligently matches you with 
      perfect accommodations based on your preferences, budget, and travel style. By analyzing thousands of data points 
      from previous travelers, our system recommends hotels and villas that truly fit your needs. Whether you're looking 
      for luxury resorts with specific amenities or hidden boutique hotels with authentic local experiences, our AI 
      simplifies the planning process while ensuring exceptional quality and value for your journey.
    </p>
</div>
</section>
</>
  )
}

export default Section3