"use client";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLeaf, FaBars } from "react-icons/fa";
import Image from "next/image";
import img from "@/public/login-page.png";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";
import { createPortal } from "react-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // To avoid hydration mismatch with portals
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Navbar top */}
      <div className="flex items-center justify-between py-2 px-4">
        <Link href="/">
          <span className="text-2xl text-white ml-2 flex items-center gap-2 cursor-pointer">
            <FaLeaf color="green" /> Explora.ai
          </span>
        </Link>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-white text-2xl mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
      </div>

      {/* Menu links */}
      <ul
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-20 left-1/2 -translate-x-1/2 bg-black rounded-xl w-10/12 
          md:static md:flex md:translate-x-0 md:bg-transparent md:w-auto md:items-center text-sm`}
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
              className="text-white p-3"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowPage(true)}
              className="text-white p-3"
            >
              Login
            </button>
          )}
        </li>
      </ul>

      {/* Modal rendered via portal */}
      {mounted &&
        showPage &&
        !session &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-slate-950 shadow-2xl border border-gray-700 flex flex-col md:flex-row 
                            items-center justify-between rounded-2xl w-full max-w-4xl h-[80%] 
                            relative overflow-hidden">
              
              {/* Close button */}
              <button
                onClick={() => setShowPage(false)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-800 transition text-xl font-bold"
              >
                ✕
              </button>

              {/* Left side */}
              <div className="flex flex-col text-center items-center justify-center gap-6 p-8 md:w-1/2">
                <h2 className="text-4xl text-green-500">Welcome To Explora!</h2>
                <p className="text-green-500">
                  Login with Google to access your personalized dashboard.
                </p>

                <button
                  onClick={() => signIn("google")}
                  className="cursor-pointer flex items-center justify-center gap-2 bg-white text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-100 transition"
                >
                  Continue with Google <FcGoogle size={25} />
                </button>
              </div>

              {/* Right side image */}
              <div className="hidden md:flex md:w-1/2 items-center justify-center p-6">
                <Image
                  src={img}
                  alt="Login Illustration"
                  width={350}
                  height={300}
                  className="object-cover"
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Navbar;
