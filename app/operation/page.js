"use client";

import { useState, useEffect } from "react";
import React from "react";
import DaySection from "@/components/output/DaySection";
import Chatbot from "@/components/Chatbot";
import DateSection from "@/components/output/DateSection";
import { SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const Page = () => {
  const [firstResponse, setFirstResponse] = useState(false);
  const [showIndex, setShowIndex] = useState(null);
  const [finalData, setFinalData] = useState({});
  const [showDate, setShowDate] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();

  const [newMember, setNewMember] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // ✅ New state
  
  const checkUser = async (id) => {
    try {
      const response = await axios.get(`/api/user`, {
        params: { id },
      });
      if (response?.data) {
        console.log("Existing user data:", response.data);
      } else {
        console.log("User not found, showing modal...");
        setNewMember(true);
      }
    } catch (error) {
      console.log("User not found, showing modal...");
      setNewMember(true);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      checkUser(user?.id);
    }
  }, [isLoaded, isSignedIn, user]);

  const handleNameSubmit = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      const response = await axios.post("/api/user", {
        name,
        description, // ✅ send description too
        clerkId: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      setNewMember(false);
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save your information. Please try again.");
    }
  };

  return (
    <SignedIn>
      {/* Modal for new user */}
      {newMember && (
        <div className="fixed inset-0 p-6 bg-black bg-opacity-80 flex flex-col gap-5 items-center justify-center z-50 text-white">
          <h2 className="text-2xl md:text-4xl font-semibold w-full md:w-1/2 flex items-center justify-center ">
            Welcome, Please provide your details !
          </h2>

          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-sm text-white border border-gray-600 outline-none w-full md:w-1/2"
          />

          {/* ✅ New Description Textarea */}
          <textarea
            placeholder="Tell us about yourself"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-sm text-white border w-full md:w-1/2 border-gray-600 outline-none resize-none"
            rows={4}
          ></textarea>

          <button
            onClick={handleNameSubmit}
            className="flex items-center gap-2 justify-center w-full md:w-1/2 bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            <FaCheck /> Confirm
          </button>
        </div>
      )}

      {/* Main Section */}
      <section className="w-full min-h-screen">
        <Chatbot
          firstResponse={firstResponse}
          setFirstResponse={setFirstResponse}
          finalData={finalData}
          setFinalData={setFinalData}
        />
        {firstResponse && (
          <div className="w-full min-h-screen flex flex-col lg:flex-row p-6 gap-5">
            <DateSection
              finalData={finalData}
              setShowDate={setShowDate}
              setShowIndex={setShowIndex}
            />
            <DaySection
              finalData={finalData}
              showDate={showDate}
              showIndex={showIndex}
            />
          </div>
        )}
      </section>
    </SignedIn>
  );
};

export default Page;
