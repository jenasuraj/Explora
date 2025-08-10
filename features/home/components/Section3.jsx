import React from 'react'
import Image from 'next/image'
import mapimg from '@/public/map.png'
const Section3 = () => {
  return (
<>

<section className="min-h-[70vh] w-10/12 max-w-7xl mx-auto mt-10 text-white  shadow-sm rounded-t-3xl rounded-b-2xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-10" data-aos="fade-up"
     data-aos-duration="3000">
  {/* Text Section */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image
      src={mapimg}
      alt="AI Travel Planning Illustration"
      className="rounded-xl object-cover"
      width={500}
      height={400}
      priority
    />
  </div>
  <header className="text-center md:text-left md:w-1/2 space-y-4">
    <h1 className="text-4xl sm:text-3xl lg:text-5xl   mb-5">
      See the destination in map
    </h1>
    <p className="text-base sm:text-lg  leading-relaxed">
    You can explore this place in more detail on Google Maps.
Click the link to see its exact location, nearby landmarks, and get directions easily.
Experience the place precisely as if you were there!
    </p>
  </header>
</section>
</>
  )
}

export default Section3
