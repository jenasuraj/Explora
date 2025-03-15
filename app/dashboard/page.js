"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";


const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const searchParams = useSearchParams();
  const image_url = searchParams.get("image_url");
  const place = searchParams.get("place_name");
  const description = searchParams.get("description");
  const weather = searchParams.get("weather");
  const [images,setImages]=useState([])

    useEffect(() => {
      if (!toggle) return; 
  
      const fetchImages = async () => {
        try {
          const PlaceUrl = `https://api.unsplash.com/search/photos?query=${place}&client_id=r0YgDi67MiER4cKKjEE5fSBaP-nh3i486kSpusedhnQ`;
          const result = await axios.get(PlaceUrl);

          setImages((prevImages) => {
            const updatedImages = [
              ...prevImages,
              ...result.data.results.map((image) => image.urls.full),
            ];
           
            return updatedImages;
          });
         

  
        } 
        catch (error) {
          console.log("Error retrieving info:", error.message);
        }
      };
  
      fetchImages();
    }, [toggle]); // ✅ Fetch images only when toggle changes
  
 
  
    console.log(images[0])
    console.log(images.length)
  

  return (
    <>
      <div className="bg-[#0E1A3A] min-h-[100vh] w-full flex justify-center items-center p-4 relative">
        {/* Outer border container */}
        <div className="max-w-[90%] md:max-w-2xl lg:max-w-4xl h-auto md:h-[50vh] flex flex-col md:flex-row items-center p-4">
          {/* Image Container */}
          <div className="w-full md:w-1/2 h-auto flex justify-center items-center flex-col">
            <Image
              src={image_url}
              width={500}
              height={150}
              alt="travelling"
              className="object-cover rounded-lg max-w-full h-auto"
            />
            <button
              onClick={() => setToggle(!toggle)}
              className="mt-5 bg-sky-500 h-auto text-white py-1 hover:bg-green-600 cursor-pointer px-10"
            >
              More images
            </button>
          </div>

          {/* Text Container */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center p-4">
            <p className="text-lg text-gray-300">
              {description || "No description available."}
            </p>
            <p className="text-sky-500 text-2xl font-bold mt-2">{place}</p>
            <p
              className={`${
                weather > 30 ? "text-red-500" : "text-sky-500"
              } text-2xl font-bold mt-2`}
            >
              {weather}°C
            </p>
          </div>
        </div>

        {/* Toggle Page */}
        {toggle && (
  <div className="w-[90%] h-[60%] lg:w-[50%] lg:h-[60%] lg:top-0 border bg-[#0E1A3A] opacity-90 border-sky-600 absolute flex justify-center items-center flex-col p-4 rounded-lg">
    <button
      className="inline-block px-6 py-1 bg-red-500 text-white text-xl cursor-pointer rounded-md hover:bg-red-700 transition-all"
      onClick={() => setToggle(false)}
    >
      Close
    </button>
    <div className="w-full h-1/2  overflow-x-auto flex gap-5 p-4 rounded-md">
      {images.map((item, index) => (
        <div key={index} className="min-w-[200px] flex-shrink-0">
          <Image
            className="rounded-lg object-cover border-2 shadow-lg hover:scale-105 transition-transform duration-300"
            src={item}
            width={300}
            height={250}
            alt="travelling"
          />
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default Dashboard;
