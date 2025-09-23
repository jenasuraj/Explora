"use client"
import React from 'react'
import { useState,useEffect,useRef } from 'react'
import '@/app/Loader.css'
import { MdCameraAlt } from "react-icons/md";
import { useUser } from '@clerk/nextjs';

const page = () => {
const user = useUser()
if(user){
  console.log(user.user)
}
{/*const refData = useRef(null)
const[loading,setLoading] = useState(true)

const loadingPage = ()=>{
refData.current = setTimeout(() =>{
        setLoading(false)
  },5000);
}
loadingPage() 
useEffect(()=>{
    return()=>clearTimeout(refData.current)
})
    
    {loading &&(
        <div className='fixed w-full h-screen gap-2 bg-black text-white flex items-center justify-center text-3xl z-50'>
         Fetching your information from database <div className="loader"></div>
        </div>
    )}

*/}


return (
    <>

    <section className='w-full min-h-screen border border-gray-800 shadow-2xl rounded-2xl lg:w-1/2'>
    <div className='bg-gray-500 w-full h-[30vh] rounded-t-2xl relative'>
       <div className='absolute bottom-2 right-2 rounded-full p-1 border border-black bg-gray-400'>
         <MdCameraAlt color='black' size={25}/>
       </div>
       <div className='absolute bottom-1 left-1  rounded-full p-10  border border-black bg-gray-400'>
         <MdCameraAlt color='black' size={35}/>
       </div>
    </div>
    </section>
    </>
  )
}

export default page
