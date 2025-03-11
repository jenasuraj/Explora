"use client";
import Image from "next/image";
import React from "react";
import { useSearchParams } from "next/navigation";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const image_url = searchParams.get("image_url");
  const place = searchParams.get("place_name");
  const description = searchParams.get("description");
  const weather = searchParams.get("weather");

  return (
    <div className="bg-[#0E1A3A] min-h-screen w-full flex justify-center items-center p-4">
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
          <button className='mt-5 bg-sky-500 h-auto text-white py-1 hover:bg-green-600 cursor-pointer px-10'>More images</button>
          
        </div>

        {/* Text Container */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center p-4">
          <p className="text-lg text-gray-300">{description || "No description available."}</p>
          <p className="text-sky-500 text-2xl font-bold mt-2">{place}</p>
          <p className="text-sky-500 text-2xl font-bold mt-2"> {weather}°C</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
