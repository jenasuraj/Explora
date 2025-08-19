"use client";
import { useState } from "react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {  FaLeaf, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>

      <div className="flex items-center justify-between py-2 px-4">
        <Link href="/">
          <ul className="text-2xl text-white ml-2 flex items-center gap-2">
            <FaLeaf color="green"/> Explora.ai
          </ul>
        </Link>

        <button
          className="md:hidden text-white text-2xl mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
      </div>

      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-20 left-1/2 -translate-x-1/2 bg-black rounded-xl w-10/12 md:static md:flex md:translate-x-0 md:bg-transparent md:w-auto md:items-center text-sm`}
      >
        {/* About */}
        <Link href="/about">
          <li>
            <button
              className={`${
                pathname === "/about" ? "text-yellow-400" : "text-white"
              } flex items-center gap-2 w-full text-left p-3`}
            >
              About
            </button>
          </li>
        </Link>

        {/* Services */}
        <Link href="/services">
          <li>
            <button
              className={`${
                pathname === "/services" ? "text-yellow-400" : "text-white"
              } flex items-center gap-2 w-full text-left p-3`}
            >
              Services
            </button>
          </li>
        </Link>

        {/* Contact */}
        <Link href="/contact">
          <li>
            <button
              className={`${
                pathname === "/contact" ? "text-yellow-400" : "text-white"
              } flex items-center gap-2 w-full text-left p-3`}
            >
              Contact
            </button>
          </li>
        </Link>
      </ul>
    </>
  );
};

export default Navbar;
