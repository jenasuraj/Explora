import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <div className='flex flex-col justify-center items-center  '>

      <p>Might be interested in some of our other platforms</p>
      
      <Link href='/services'>
   <button className='mt-10 inline-block bg-black px-6 py-1 text-white rounded-sm cursor-pointer'>Know a bit more about services</button>
      </Link>

<Link href='/contact'>
   <button className='mt-10 inline-block bg-black px-6 py-1 text-white rounded-sm cursor-pointer'>Know a bit more how to contact</button>
</Link>

    </div>
  )
}

export default page
