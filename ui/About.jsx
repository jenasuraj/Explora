import React from 'react'
import Link from 'next/link'
const About = () => {
  return (
    <div className='text-white min-h-screen bg-[#0E1A3A] flex flex-col justify-center items-center text-center gap-5'>
     <p className='text-5xl font-bold text-sky-500'>Wanna know about us?</p>
     <p className='text-2xl font-bold text-sky-500'>Vlora is your travelling agent</p>
     <p className='w-1/2 h-auto text-xl '>Vlora is a travelling agent , plans and track and give you best result 
     regarding hotels, flights , best sites and All
     it does helps a lot to visit a place with all facilities and all
     <br />
     <span className='text-sky-500 text-sm'>Click the button below to get started</span></p>
     <Link href="/"><button className='bg-sky-500 h-auto text-white py-2 hover:bg-green-600 cursor-pointer px-10'>Let's Go</button></Link>
    </div>
  )
}

export default About
