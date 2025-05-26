
"use client";
import { useState } from "react";
import React from 'react'
import Link from "next/link";

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
  return (
    <>
   <Link href="/"><ul className="text-xl font-bold ml-2">Vlora.ai🌿</ul></Link>
              <button
                className="md:hidden text-white text-2xl mr-2"
                onClick={() => setIsOpen(!isOpen)}>
                ☰
              </button>     
              <ul
                className={`${
                  isOpen ? "block" : "hidden"
                } absolute top-20 left-1/2 -translate-x-1/2 bg-black rounded-xl w-10/12 md:static md:flex md:translate-x-0 md:bg-transparent md:w-auto md:items-center text-sm`}>
                <li>
                  <button className="block w-full text-left text-white p-3 md:inline">
                    About
                  </button>
                </li>
                <li>
                  <button className="block w-full text-left text-white p-3 md:inline">
                    Services
                  </button>
                </li>
                <li>
                  <button className="block w-full text-left text-white p-3 md:inline">
                    Contact
                  </button>
                </li>
              </ul>
    </>
  )
}

export default Navbar
