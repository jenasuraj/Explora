"use client";
import React, { useState } from "react";
import Image from "next/image";
import mainImg from "@/public/main-page.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";

const MainPage = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const sendData = async () => {
    try {
      setLoading(true);
      setError(null); // Reset previous error state

      const response = await axios.post("http://127.0.0.1:8000", { query: data });

      // Extracting response data
      const { image_url, place_name, description,weather } = response.data;
      //console.log(image_url)
       
      console.log("FROM MAINPAGE")
      console.log("Extracted city"+{place_name})
      console.log("Extracted image:"+ {image_url})
      console.log("Extracted description"+ {description})
      console.log("Extracted weather:"+{weather})
     

      setData("");

      // Use search params correctly in Next.js
      router.push(`/dashboard?image_url=${encodeURIComponent(image_url)}&place_name=${encodeURIComponent(place_name)}
      &description=${encodeURIComponent(description)}&weather=${encodeURIComponent(weather)}`);

    } catch (error) {
      console.error("Error pushing data to FastAPI:", error);
      setError("Failed to send data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0E1A3A] h-[90vh] w-full text-white flex justify-center items-center flex-col relative">
      {/* Top div */}
      <div className="w-auto flex flex-col items-center justify-center text-lg md:text-xl lg:text-2xl xl:text-4xl text-center px-4">
        <p className="text-5xl text-sky-500 p-5 font-bold ml-5">
          Explore one of the best locations on the planet
        </p>
        <p className="pb-2 mb-3 text-sm md:text-md lg:text-lg px-4">
          Explore the beauty of the planet, Plan a trip with your partner to explore the globe
        </p>
      </div>

      {/* Input & Button */}
      <div className="px-6 flex flex-col justify-center items-center lg:flex lg:w-1/2 lg:flex-row">
        <Image className="rounded-bl-md" src={mainImg} width={400} height={150} alt="travelling" />

        <div className="py-6 w-full h-auto lg:border lg:border-sky-500 lg:w-full lg:h-full lg:px-4 lg:flex lg:flex-col lg:justify-center lg:items-center">
          <input
            type="text"
            name="search"
            placeholder="Plan a trip"
            className="text-black px-2 bg-white border border-sky-500 w-full py-3 mb-2"
            value={data}
            onChange={(e) => setData(e.target.value)}
            disabled={loading} // Disable input when loading
          />

          <button
            className="bg-sky-500 w-full h-auto text-white py-3 hover:bg-green-600 cursor-pointer px-2"
            onClick={sendData}
          >
            Make a trip
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0E1A3A] bg-opacity-50">
          <p className="text-sky-600 text-4xl">Retrieving the data, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
