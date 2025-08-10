"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  AiFillApple,
  AiFillAppstore,
  AiFillChrome,
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillOpenAI,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";

const Section1 = () => {
  const [companyLogo] = useState([
    { logo: AiFillApple, name: "Apple" },
    { logo: AiFillAppstore, name: "Microsoft" },
    { logo: AiFillChrome, name: "Chrome" },
    { logo: AiFillFacebook, name: "Facebook" },
    { logo: AiFillGoogleCircle, name: "Google" },
    { logo: AiFillInstagram, name: "Instagram" },
    { logo: AiFillOpenAI, name: "OpenAI" },
    { logo: AiFillLinkedin, name: "LinkedIn" },
    { logo: AiFillGithub, name: "GitHub" },
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="p-10 min-h-[80vh]  border-2 border-gray-700 w-11/12 max-w-7xl mx-auto rounded-3xl flex flex-col justify-center items-center"
      data-aos="zoom-out"
    >
      {/* Heading */}
      <header className="text-white text-center mb-12">
        <h1 className="text-5xl ">Welcome to Explora.ai</h1>
        <p className="text-lg mt-5 max-w-2xl mx-auto">
          Let our smartest AI pick your perfect destination. Experience travel
          the smarter way. Give it a try and unlock where brilliance takes you.
        </p>
        <Link href="/operation">
          <button className="mt-10 px-8 py-3 bg-white text-black font-semibold rounded-full cursor-pointer hover:bg-gray-600 hover:text-white transition-all duration-300">
            Let’s explore
          </button>
        </Link>
      </header>

      {/* Partners title */}
      <p className="text-white text-xl font-medium mb-4">🚀 Our Trusted Partners</p>

      {/* Animated Logo Strip */}
      <div className="w-full overflow-hidden">
        <div className="flex gap-6 whitespace-nowrap animate-scroll-x">
          {companyLogo.map((item, index) => (
            <div
              key={index}
              className="flex mt-5 items-center gap-2 bg-gray-800 px-4 py-2 rounded-full text-white shadow-md mx-2 hover:bg-gray-700 transition-all duration-200"
            >
              <item.logo size={22} />
              <p className="text-sm font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section1;
