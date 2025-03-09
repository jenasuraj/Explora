"use client"
import  { useState } from 'react'
import logo from '@/public/myimg.png'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      {/* Navbar */}
      <div className='z-50 min-h-[10vh] w-full bg-[#0E1A3A] flex justify-between items-center px-4 md:px-8'>

        {/* Logo and Brand Name */}
        <div className='flex items-center space-x-2'>
          <Image
            src={logo}
            width={40} // Adjusted for mobile
            height={40}
            alt="Vlora.ai Logo"
          />
          <Link href="/"><div className='text-2xl md:text-4xl text-white font-semibold'>
            Vlora.ai
          </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className='hidden md:flex text-white gap-8 font-medium'>
          <Link href="/about"><div className='cursor-pointer'>About us</div></Link>
          <Link href="/contact"><div className='cursor-pointer'>Contact</div></Link>
         <Link href="https://github.com/jenasuraj/Ai-travel-app"><div className='cursor-pointer'>Github</div></Link> 
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <div className='md:hidden'>
          <button onClick={toggleSidebar} className='text-white text-2xl'>
            ☰
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-[#0E1A3A] text-white transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <div className='p-4 flex justify-end'>
          <button onClick={toggleSidebar} className='text-3xl'>
            ✕
          </button>
        </div>

        {/* Sidebar Links */}
        <div className='flex flex-col items-start gap-6 p-6 text-xl'>
        <Link href="/about"> <div className='cursor-pointer' onClick={toggleSidebar}>About us</div></Link> 
        <Link href="/contact"><div className='cursor-pointer' onClick={toggleSidebar}>Contact</div></Link>
          <Link href="https://github.com/jenasuraj/Ai-travel-app"><div className='cursor-pointer' onClick={toggleSidebar}>Github</div></Link> 
        </div>
      </div>
    </>
  )
}

export default Navbar
