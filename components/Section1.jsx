"use client";

import front_img from '@/public/front-img.jpg'
import Image from 'next/image';
import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Section1Hooks from "@/components/Section1Hooks";
import { SignUpButton } from '@clerk/nextjs';

const Section1 = () => {
  const companyLogo = Section1Hooks();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <section className="relative min-h-[80vh] w-11/12 max-w-7xl rounded-md mx-auto  overflow-hidden flex flex-col justify-center items-center p-10"
        data-aos="zoom-out">
        {/* Background image */}
        <Image
          src={front_img}
          alt="Background"
          fill
          priority
          className="object-cover absolute inset-0 "
        />

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Content on top of image */}
        <div className="absolute z-20 flex flex-col justify-center items-center w-full">
          <header className="text-white text-center mb-12">
            <h1 className="text-5xl">Welcome to Explora.ai</h1>
            <p className="text-lg mt-5 max-w-2xl mx-auto">
              Let our smartest AI pick your perfect destination. Experience travel
              the smarter way. Give it a try and unlock where brilliance takes you.
            </p>
             <SignUpButton>
               <div className="rounded-sm mt-10 px-5 py-3 border border-gray-400 text-lg text-white font-semibold cursor-pointer hover:bg-white hover:text-black transit duration-300 ">
                Let's explore
              </div>
             </SignUpButton>
          </header>

          {/* Partners title */}
          <p className="text-white text-xl font-medium mb-4">🚀 Our Trusted Partners</p>

          {/* Animated Logo Strip */}
          <div className="w-full overflow-hidden">
            <div className="flex gap-6 whitespace-nowrap animate-scroll-x">
              {companyLogo.map((item, index) => (
                <div
                  key={index}
                  className="flex mt-5 items-center gap-2 bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full text-white shadow-md mx-2 hover:bg-gray-700 transition-all duration-200"
                >
                  <item.logo size={22} />
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Section1;
