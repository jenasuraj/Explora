"use client"

import React from 'react'
import { useState } from 'react'

const Contact = () => {
  const[formData, setFormData] = useState({
    name:'',
    email:'',
    description:'',
  })
  const [error,setError] = useState(false)

  const handleChange = (e) =>{
   const {name,value} = e.target
   setFormData((prev)=>({...prev,[name]:value}))
  }
  const handleSubmit = ()=>{
  if(!formData.name || !formData.email || !formData.description){
  setError(true) 
  setFormData({name:'',email:'',description:''})
  }
  else{
    console.log("DONE !")
    setFormData({name:'',email:'',description:''})
  }
  }

  return (
    <>
    <form className='w-full h-full lg:w-1/2 flex justify-center items-center px-2 py-2 flex-col gap-2' onSubmit={handleSubmit}>
    <input type="text" name='name' placeholder='Enter your name' className='w-full border border-gray-700 px-2 text-white py-3 rounded-md' onChange={handleChange}/>
    <input type="email" name='email' placeholder='Enter your email' className='w-full border border-gray-700 px-2 text-white py-3 rounded-md' onChange={handleChange}/>
    <textarea type="description" name='description' placeholder='description' className='w-full border border-gray-700 px-2 text-white py-3 rounded-md' onChange={handleChange}/>
    <button className={`cursor-pointer w-full ${error ? 'bg-red-500 text-white':'bg-white'}  text-black px-2 py-3 rounded-xl`} type='submit'>Submit</button>
    </form>
    </>
  )
}

export default Contact