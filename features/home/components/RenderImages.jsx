import React from 'react'
import Image from 'next/image'
import { IoLocationSharp } from "react-icons/io5";
import t1 from '@/public/t1.jpg'
import b2 from '@/public/b2.jpg'
import b3 from '@/public/b3.jpg'

const images = [
    {"img":t1,"location":"Taj mahal"},
    {"img":b2,"location":"Great Walls of China"},
    {"img":b3,"location":"Statue of Liberty"}
               ]

const RenderImages = () => {
  return (
  <>
  {images.map( (item,index)=>{
    return(
    <div key={index} className='w-full md:w-1/3 h-[40vh] relative'>
         <Image
         src={item.img}
         alt='bottom 1 img'
         fill
         className='object-cover rounded-4xl'/>
         <div className='absolute backdrop-blur-2xl px-3 border border-gray-400  rounded-full py-1 gap-2 bottom-5 right-5 flex items-center'>
           <IoLocationSharp color='white' size={20}/>{item.location}
         </div>
    </div>
    )
  })}
  </>
  )
}
export default RenderImages
