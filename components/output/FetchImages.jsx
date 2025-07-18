'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import fallbackImg from '@/assets/sample.png'

const FetchImages = ({ item }) => {
  const [imgUrl, setImgUrl] = useState(null)

  const fetchImage = async (place) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${place}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY }`
      )
      const result = response.data.results[0]?.urls?.raw
      setImgUrl(result || fallbackImg)
    } catch (error) {
      console.log('Error while fetching image from Unsplash!')
      setImgUrl(fallbackImg)
    }
  }

  useEffect(() => {
    fetchImage(item)
  }, [item])

  return (
    <> 
      <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden">
         {imgUrl ?(
           <Image
            src={imgUrl}
            alt="place"
            fill
            className="object-cover"
          />
         ):<p>Loading image</p>}
        </div>
    </>
  )
}

export default FetchImages
