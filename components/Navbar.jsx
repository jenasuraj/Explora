"use client";
import { useState, useRef, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiLindenLeaf } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import {
  SignUpButton,
  SignedIn,
  SignedOut,
  ClerkLoaded,
  useUser,
  SignOutButton
} from "@clerk/nextjs";
import { SlLogout } from "react-icons/sl";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Profile dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ClerkLoaded>
      <div className="flex items-center w-full justify-between py-2 px-4 ">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl text-white ml-2 flex items-center gap-2 cursor-pointer">
            <GiLindenLeaf color="green" size={25} /> Explora.ai
          </span>
        </Link>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-white text-2xl mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? <HiOutlineBars3 size={35} /> : <RxCross1 size={25} />}
        </button>

        {/* Navbar links */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-20 left-1/2 -translate-x-1/2 bg-black rounded-xl w-10/12
            md:static md:flex md:translate-x-0 md:bg-transparent md:w-auto md:items-center text-sm gap-4`}
        >
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              <button
                className={`${
                  pathname === "/about" ? "text-yellow-400" : "text-white"
                } flex items-center gap-2 w-full text-left p-3`}
              >
                About
              </button>
            </Link>
          </li>

          <li>
            <Link href="/offering" onClick={() => setIsOpen(false)}>
              <button
                className={`${
                  pathname === "/offering" ? "text-yellow-400" : "text-white"
                } flex items-center gap-2 w-full text-left p-3`}
              >
                Services
              </button>
            </Link>
          </li>

          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <button
                className={`${
                  pathname === "/contact" ? "text-yellow-400" : "text-white"
                } flex items-center gap-2 w-full text-left p-3`}
              >
                Contact
              </button>
            </Link>
          </li>

          {/* Profile dropdown */}
          <li className="relative" ref={dropdownRef}>
            <SignedIn>
              <p
                className="cursor-pointer p-2 hover:bg-gray-800 rounded"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Profile
              </p>

              {dropdownOpen && (
                <div className="border shadow-2xl  border-gray-700 absolute top-full right-0 mt-2 w-40 bg-black text-white rounded z-50">
                  <SignOutButton>
                  <button className="bg-black cursor-pointer flex items-center justify-center gap-2 w-full text-md text-left px-4 py-2 ">
                   Sign Out <SlLogout color="red" size={15}/>
                  </button>
                  </SignOutButton>
                  
                    <button
                      className="cursor-pointer flex text-md  items-center justify-center gap-2 w-full text-left px-4 py-2 "
                      onClick={() => setDropdownOpen(false)}>
                      <Link href="/profile" className="flex items-center justify-center gap-2">
                      <IoSettingsOutline size={15}/> Settings
                      </Link>
                    </button>
                </div>
              )}
            </SignedIn>

            <SignedOut>
              <SignUpButton>
                <button className="text-white p-3">Sign Up / Login</button>
              </SignUpButton>
            </SignedOut>
          </li>
        </ul>
      </div>
    </ClerkLoaded>
  );
};

export default Navbar;
