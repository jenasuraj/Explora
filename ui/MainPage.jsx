"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const MainPage = () => {
  const [inputData, setInputData] = useState('');
  const router = useRouter();

  const searchPlace = (e) => {
    e.preventDefault();
    if (inputData) {
      router.push(`/showData?query=${encodeURIComponent(inputData)}`);
    }
  }

  const handleQuickSearch = (searchQuery) => {
    setInputData(searchQuery);
    router.push(`/showData?query=${encodeURIComponent(searchQuery)}`);
  }

  return (
    <div className='w-full h-screen bg-gray-950 flex justify-center items-center flex-col text-white'>
      <div className='text-8xl font-sans'>
        Vlora.ai
      </div>

      <div className='flex justify-center items-center mt-10'>
        <form onSubmit={searchPlace}>
          <input
            type="text"
            placeholder='Explore your taste'
            name='explore'
            className='border border-white px-40 py-1.5'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button
            type='submit'
            className='cursor-pointer inline-block bg-purple-900 py-1.5 border px-8 border-white'
          >
            Search
          </button>
        </form>
      </div>

      <div className='mt-10 py-3'>
        <div className='text-3xl'>
          Our popular searching's this week
        </div>

        <div
          className='w-full h-[5vh] mt-5 border border-purple-900 text-white bg-none flex justify-center items-center font-bold hover:bg-purple-900 hover:cursor-pointer hover:text-white'
          onClick={() => handleQuickSearch('Best Winter places in the planet')}
        >
          Best Winter places in the planet
        </div>

        <div
          className='w-full h-[5vh] mt-5 border border-purple-900 text-white bg-none flex justify-center items-center font-bold hover:bg-purple-900 hover:cursor-pointer hover:text-white'
          onClick={() => handleQuickSearch('Top Indian places for honeymoon')}
        >
          Top Indian places for honeymoon
        </div>
      </div>

    </div>
  )
}

export default MainPage;
