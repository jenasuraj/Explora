"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { GiLindenLeaf } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineBars3 } from "react-icons/hi2";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Navbar top */}
      <div className="flex items-center w-full justify-between py-2 px-4">
        {!session ? (
          <Link href="/">
          <span className="text-2xl text-white ml-2 flex items-center gap-2 cursor-pointer">
            < GiLindenLeaf color="green" size={25}/> Explora.ai
          </span>
        </Link>
        ):(
          <span className="text-2xl text-white ml-2 flex items-center gap-2 cursor-pointer">
            < GiLindenLeaf color="green" size={25}/> Explora.ai
          </span>
        )}

        {/* Mobile toggle button */}
        <button className="md:hidden text-white text-2xl mr-2"
          onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? <HiOutlineBars3 size={35}/> : <RxCross1 size={25}/>}
        </button>
      </div>

      {/* Menu links */}
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-20 left-1/2 -translate-x-1/2 bg-black rounded-xl w-10/12 
          md:static md:flex md:translate-x-0 md:bg-transparent md:w-auto md:items-center text-sm`}>
            
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
          <Link href="/services" onClick={() => setIsOpen(false)}>
            <button
              className={`${
                pathname === "/services" ? "text-yellow-400" : "text-white"
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

        {/* Login/Logout */}
        <li>
          {session ? (
            <button
              onClick={() => signOut()}
              className=" p-3 text-red-400">
              Logout
            </button>
          ) : (
            <button
              className="text-white p-3">
              <Link href="/login_reg">Login</Link>
            </button>
          )}
        </li>
      </ul>
    </>
  );
};

export default Navbar;
