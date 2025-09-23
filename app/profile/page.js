"use client";
import React, { useState, useEffect } from "react";
import "@/app/Loader.css";
import { useUser } from "@clerk/nextjs";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import axios from "axios";
import img from "@/public/banner.jpg";
import Image from "next/image";
import { FiUser } from "react-icons/fi";
import profimg from "@/public/profile.webp";
import EditProfileModal from "@/components/EditProfileModal ";

const page = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    about: "",
    profile: "",
    banner: "",
  });
  const [tempFormData, setTempFormData] = useState({})
  const [showModal, setShowModal] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();
  const [refresh,setRefresh] = useState(false)
  const [loading,setLoading] = useState(false)

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`/api/profile`, { params: { id } });
      if (response) {
        const finalResponse = response?.data?.data;
        setFormData({
          name: finalResponse.name,
          email: finalResponse.email,
          about: finalResponse.about,
          banner: finalResponse.bannerImg,
          profile: finalResponse.profileImg,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error fetching data for profile", error);
    }
  };

  useEffect(()=>{
    setTempFormData(formData)
  },[showModal])

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      fetchData(user?.id);
    }
  }, [isSignedIn, isLoaded, user, refresh]);


  return (
    <>
      <section className="w-full max-w-4xl mx-auto gap-2 text-white p-4 min-h-screen border border-black shadow-2xl rounded-3xl bg-black flex-col">
        {/* Banner Section */}
        <div className="w-full h-[30vh] md:h-[35vh] relative rounded-t-3xl overflow-hidden shadow-xl">
          <Image
            alt="img"
            src={formData.banner ? formData.banner : img}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          {/* Profile Picture */}
          <div className="absolute bottom-4 left-6 w-24 h-24 md:w-28 md:h-28 rounded-full  shadow-2xl overflow-hidden">
            <Image
              alt="profimg"
              src={formData.profile ? formData.profile : profimg}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* User Info Section */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between px-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FiUser className="text-blue-400" size={22} />
              {formData.name ? formData.name : "Unknown!"}
            </h1>
            <p className="text-gray-300">
              {formData.email ? formData.email : "explora@unknown.com"}
            </p>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-lg mt-4 md:mt-0">
            {formData.about
              ? formData.about
              : "About: Welcome to default description ..."}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all shadow-xl rounded-full w-full md:w-1/3 p-2 text-lg font-semibold"
          >
            Edit profile <FaRegEdit size={20} />
          </button>

          <button className="flex items-center justify-center gap-2 border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all shadow-xl rounded-full w-full md:w-1/3 p-2 text-lg font-semibold">
            See Posts <MdOutlineLocalPostOffice size={20} />
          </button>
        </div>
      </section>

      {/* MODAL */}
   {showModal && (
   <EditProfileModal 
    loading = {loading}
    setLoading={setLoading}
    tempFormData={tempFormData}
    setTempFormData={setTempFormData}
    refresh = {refresh}
    setRefresh = {setRefresh}
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    formData={formData}
    setFormData={setFormData}
    />
    )}
    </>
  );
};

export default page;
