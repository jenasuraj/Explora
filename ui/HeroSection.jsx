import React from 'react'
import Image from 'next/image'
import mainImg from '@/public/main-page.jpg'
import canada from '@/public/canada.jpg'
import greece from '@/public/greece.jpg'
import spain from '@/public/spain.jpg'
const HeroSection = () => {
   
  const items = [
    {
      id:1,
      img:canada,
      nameOfPlace:"Banff national park",
      country:"Canada"
    },
    {
      id:2,
      img:greece,
      nameOfPlace:"Santorini",
      country:"Greece"
    },
    {
      id:3,
      img:spain,
      nameOfPlace:"Madrid",
      country:"Spain"
    }
  ]

  return (
    <div className='bg-[#0E1A3A] min-h-[90vh] w-full text-white flex justify-center items-center flex-col'>
      
      {/**top div */}
           <div className='w-auto flex flex-col items-center justify-center text-lg md:text-xl lg:text-2xl xl:text-4xl text-center px-4 mb-10'>
            <p className='text-4xl text-sky-500 p-5  font-bold ml-5 lg:text-5xl lg:mr-10'>Explore your paradise with single Search</p>
            <p className='pb-2 mb-3 text-sm md:text-md  px-4 lg:text-2xl'>Let the Ai chooses best places and plan a full trip for you</p>
            </div>
      
      {/**lower div */}
            
          <div className='px-6 flex flex-col justify-center items-center gap-10   lg:flex lg:w-1/2 lg:flex-row'>
            
          {items.map( (item)=>
          {
            return(
              
             <div key={item.id} className='flex flex-col justify-center items-center'>
             <Image className='rounded-bl-md'
              src={item.img}
              width={400} 
              height={150}
              alt="travelling"
              /> 
              <p className='mt-2'>{item.nameOfPlace}</p>
              <p className='text-xl font-bold text-sky-500'>{item.country}</p>
             </div>
            
            )
          } )}
              

   
      
          </div>
      
    </div>
  )
}

export default HeroSection
