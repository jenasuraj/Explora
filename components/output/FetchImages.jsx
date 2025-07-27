'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

const fallbackImg = '/sample.png'; // ✅ Direct public folder path

const FetchImages = ({ item }) => {
  const [imgUrl, setImgUrl] = useState(null);

  const fetchImage = async (place) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${place}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
      );

      const result = response.data.results[0]?.urls?.regular;
      setImgUrl(result || fallbackImg);
    } catch (error) {
      console.error('Error fetching image from Unsplash:', error.message);
      setImgUrl(fallbackImg);
    }
  };

  useEffect(() => {
    fetchImage(item);
  }, [item]);

  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
      <Image
        src={imgUrl || fallbackImg}
        alt={item}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
      />
    </div>
  );
};

export default FetchImages;
