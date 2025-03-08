import React from 'react'
import Image from 'next/image'
import mainImg from '@/public/main-page.jpg'
const MainPage = () => {
  return (
    <div className='bg-[#0E1A3A] h-[90vh] w-full text-white flex justify-center items-center flex-col'>
     

{/**top div */}
     <div className='w-auto flex flex-col items-center justify-center text-lg md:text-xl lg:text-2xl xl:text-4xl text-center px-4'>
      <p className='text-4xl text-sky-500 p-5  font-bold ml-5'>Explore one of the best location in the planet</p>
      <p className='pb-2 mb-3 text-sm md:text-md lg:text-lg px-4'>Explore the beauty of the planet , Plan a trip with your partner to explore the globe</p>
      </div>

{/**lower div */}
      
      <div className='px-6 flex flex-col justify-center items-center    lg:flex lg:w-1/2 lg:flex-row'>
      
      <Image className='rounded-bl-md'
        src={mainImg}
        width={400} 
        height={150}
        alt="travelling"
        /> 

        <div className='py-6 w-full h-auto lg:border lg:border-sky-500 lg:w-full lg:h-full lg:px-4 lg:flex lg:flex-col lg:justify-center lg:items-center'>
         <input type="text" name='search' placeholder='Plan a trip' className='text-black px-2 bg-white border border-sky-500 w-full py-3 mb-2'/>
         <button className='bg-sky-500 w-full h-auto text-white py-3 hover:bg-green-600 cursor-pointer px-2'>Find me</button>
      </div>

    </div>


    </div>
  )
}

export default MainPage
