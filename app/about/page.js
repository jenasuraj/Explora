import React from 'react'
import Link from 'next/link'
import Section2 from '@/ui/Section2'
import Section3 from '@/ui/Section3'
const page = () => {
  return (
   <>
<Link href='/about/more'>
   <button className='mt-10 inline-block bg-black px-6 py-1 text-white rounded-sm cursor-pointer'>Know a bit more</button>
</Link>
<Section2/>
<Section3/>
   </>
  )
}

export default page
