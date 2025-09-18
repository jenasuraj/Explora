"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import img from "@/public/login-page.png";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // ✅ Run redirect only when session changes
  useEffect(() => {
    if (session) {
      router.push("/operation");
    }
  }, [session, router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 backdrop-blur-sm p-4">
      <div
        className="bg-slate-950 shadow-2xl border border-gray-700 flex flex-col md:flex-row 
                        items-center justify-between rounded-2xl w-full max-w-4xl h-[80%] 
                        relative overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={() => router.push("/")}
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
            className="cursor-pointer flex items-center justify-center gap-2  text-gray-400 border border-gray-500 py-3 px-6 rounded-lg "
          >
            Continue with Google <FcGoogle size={25} />
          </button>
        </div>

        {/* Right side image */}
        <div className="md:flex md:w-1/2 items-center justify-center py-6">
          <Image
            src={img}
            alt="Login Illustration"
            width={350}
            height={300}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
