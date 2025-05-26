"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import img from "@/public/pexels-pixabay-358532.jpg";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import Form from "@/ui/Form";
import axios from "axios";
import "../Loader.css"; // import the loader css
import { useRouter } from "next/navigation";

const Page = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seeTrip,setSeeTrip]=useState(false)
  const [formData, setFormData] = useState({
    travelDays: "",
    destination: "",
    travelStyle: "",
  });
  const [result, setResult] = useState(null); 
  const router = useRouter()

  useEffect(() => {
    const sendData = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:8000/", {
          total_days: formData.travelDays,
          destination: formData.destination,
          travel_type: formData.travelStyle,
        });

        console.log("Response from fastapi", response.data);
        setResult(response.data); // set your response
      } catch (error) {
        console.log("error pushing data to fastapi", error);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      sendData();
    }
  }, [show]);


  return (
    <>
     <Form
  show={show}
  setShow={setShow}
  formData={formData}
  setFormData={setFormData}
/>


      {/* FULLSCREEN LOADER */}
      {show && loading && (
        <div className="fullscreen-loader flex-col">
          <div className="loader"></div>
          <p className="text-lg font-mono mt-5">Loading please wait...</p>
        </div>
      )}

{show && !loading && result && (
  <section className="w-11/12 max-w-5xl min-h-[40vh] mx-auto shadow-2xl rounded-md flex flex-col md:flex-row gap-4 p-4 border border-gray-300 bg-white">
    
    {/* Left: Text Info */}
    <div className="w-full md:w-1/2 p-4 space-y-4">
      <p className="font-mono text-gray-700">
        Rain dances on rooftops, a rhythmic melody. Silver droplets kiss the earth, awakening sleepy soil.
        Puddles mirror gray skies as children splash joyfully. Petrichor rises—nature’s perfume.
        Umbrellas bloom like colorful mushrooms. It whispers secrets to leaves and quenches the world’s thirst.
        In rain, life renews, and hearts find quiet solace. 🌧️✨
      </p>

      <div className="flex flex-wrap gap-4">
        {/* See Journey Button */}
        <button
          disabled={!(formData.destination && formData.travelDays && formData.travelStyle)}
          className={`border border-green-500 text-green-600 px-4 py-2 rounded-full flex items-center gap-2 transition 
            hover:bg-green-500 hover:text-white 
            ${!(formData.destination && formData.travelDays && formData.travelStyle) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => {
            const slug = encodeURIComponent(`${formData.destination}-${formData.travelDays}days`);
            router.push(`/operation/${slug}?result=${encodeURIComponent(JSON.stringify(result))}`);
          }}
        >
          See journey <CiSearch size={20} />
        </button>

        {/* Refresh Button */}
        <button
          className="border border-red-500 text-red-500 px-4 py-2 rounded-full flex items-center gap-2 transition hover:bg-red-500 hover:text-white"
          onClick={() => {
            setShow(false);
            setResult(null);
          }}
        >
          Refresh <SlRefresh size={20} />
        </button>
      </div>
    </div>

    {/* Right: Image */}
    <div className="w-full md:w-1/2 relative rounded-md overflow-hidden">
      <div className="relative w-full h-64 md:h-full">
        <Image
          src={img}
          alt="Travel"
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-start p-6">
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-snug">
            {formData.travelDays} Days<br />
            Plan to {formData.destination}
          </h2>
        </div>
      </div>
    </div>
  </section>
)}

    </>
  );
};

export default Page;
