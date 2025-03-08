import React from 'react'
import Image from 'next/image'
import hotel from '@/public/hotels.png'
const Details = () => {
  return (
    <div className='bg-[#0E1A3A] min-h-[100vh] w-full text-white flex justify-center items-center flex-col'>
     

{/**top div */}
     <div className='w-auto flex flex-col items-center justify-center text-lg md:text-xl lg:text-2xl xl:text-4xl text-center px-4'>
      <p className='text-5xl text-sky-500 p-5  font-bold ml-5'>Let Ai shows you the best hotels</p>
      <p className='pb-2 mb-3 text-sm md:text-md lg:text-lg px-4'>Vlora.ai searches the best hotels based on the location</p>
      </div>

{/**lower div */}
      
      <div className='px-6 flex flex-col justify-center items-center    lg:flex lg:w-1/2 lg:flex-row'>
      
      <Image className='rounded-bl-md'
        src={hotel}
        width={500} 
        height={200}
        alt="travelling"
        /> 

    </div>


    </div>
  )
}

export default Details
