import React from 'react'
import img from '@/public/sam.jpg'
import Image from 'next/image'

const Section4 = () => {
  return (
    <>
    
    <section className="min-h-[70vh] w-10/12 max-w-7xl mx-auto mt-10 text-white shadow-sm rounded-t-3xl rounded-b-2xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-10" data-aos="fade-up"
     data-aos-duration="3000">
      {/* Text Section */}
      <header className="text-center md:text-left md:w-1/2 space-y-4">
        <h1 className="text-4xl mb-5 sm:text-3xl lg:text-5xl  ">
          Let us abstract the irritation to you
        </h1>
        <p className="text-base sm:text-lg text-gray-400  leading-relaxed">
          Let our AI-powered travel planner design the perfect itinerary for you — whether you're exploring
          ancient landmarks, relaxing on tropical beaches, or discovering hidden gems in bustling cities.
          Just tell us your preferences, and we’ll create a personalized, efficient, and unforgettable
          travel experience tailored just for you.
        </p>
      </header>
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={img}
          alt="AI Travel Planning Illustration"
          className="rounded-4xl object-cover"
          width={500}
          height={400}
          priority
          
        />
      </div>
    </section>
    </>
  )
}

export default Section4
