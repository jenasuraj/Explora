"use client"

import '../app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from "next-auth/react";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
         <nav className="w-12/13 md:w-1/2 fixed top-8 left-1/2 -translate-x-1/2 backdrop-blur-2xl bg-black/80 opacity-70 text-white p-2 rounded-3xl flex justify-between items-center border border-gray-600 shadow-2xl z-30">
          <Navbar/>
         </nav>
         <main className="pt-32 flex justify-center items-center flex-col bg-black ">
         {children}
        </main>
        <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}