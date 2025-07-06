"use client"

import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Section1 = () => {
      useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
    });
  }, []);

  return (
   <>
         <section className=" p-6 min-h-[70vh] bg-black w-5/6 rounded-t-3xl flex justify-center items-center rounded-b-2xl mx-auto" data-aos="zoom-out">
        <header className="text-white flex items-center justify-center flex-col text-center">
          <h1 className="text-5xl">Welcome to Vlora.ai</h1>
          <p className="text-lg mt-5 max-w-xl">
            Let our smartest AI pick your perfect destination, experience travel the smarter way.
            Give it a try and unlock where brilliance takes you.
          </p>
          <Link href="/operation">
            <button className="mt-10 px-6 py-3 bg-white text-black rounded-full cursor-pointer hover:bg-gray-500 transition-all hover:text-white">
              Lets explore
            </button>
          </Link>
        </header>
      </section>

   </>
  )
}

export default Section1
