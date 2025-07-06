
"use client";
import { useState } from "react";
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);


const pathname = usePathname()


  return (
    <>
   <Link href="/">
   <ul className="text-xl  ml-2">Explora.ai🌿</ul></Link>
            <button
                className="md:hidden text-white text-2xl mr-2"
                onClick={() => setIsOpen(!isOpen)}>
                ☰
              </button>     
              <ul
                className={`${
                  isOpen ? "block" : "hidden"
                } absolute top-20 left-1/2 -translate-x-1/2 bg-black rounded-xl w-10/12 md:static md:flex md:translate-x-0 md:bg-transparent md:w-auto md:items-center text-sm`}>
              
              
             <Link href="/about">
             <li>
            <button
            className={`${
             pathname === "/about" ? "text-yellow-400 " : "text-white"
               } block w-full cursor-pointer text-left p-3 md:inline`}
               >
             About
            </button>
            </li>
            </Link>

              
               <Link href="/services">
                <li>
                  <button
            className={`${
             pathname === "/services" ? "text-yellow-400 " : "text-white"
               } block w-full cursor-pointer text-left p-3 md:inline`}
               >
                    Services
                  </button>
                </li>
               </Link>

                <Link href="/contact">
                <li>
                 <button
            className={`${
             pathname === "/contact" ? "text-yellow-400 " : "text-white"
               } block w-full cursor-pointer text-left p-3 md:inline`}
               >
                    Contact
                  </button>
                </li>
                </Link>


                
              </ul>
    </>
  )
}

export default Navbar
