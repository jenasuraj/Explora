"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import front_img from "@/public/front-img.jpg";

const AboutPage = () => {
  return (
    <main className="min-h-screen text-white font-sans relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={front_img}
          alt="Travel background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-24 md:py-32 lg:py-40">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            What is{" "}
            <span className="bg-white text-black px-3 py-1 rounded-lg">
              Explora.ai
            </span>
            ?
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light text-white/90">
            Explora.ai helps you plan smarter trips using AI. From exploring new
            places to optimizing travel time, our tools adapt to your needs,
            giving real-time recommendations with intelligent planning.
          </p>

          <Link href="/about/more">
            <button className="mt-12 px-12 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Discover More →
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-white/30 my-16 w-3/4 mx-auto"></div>

        {/* Highlights Section */}
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "🚀 Built for Explorers",
              desc:
                "Explora.ai is crafted for people who love discovering. From itinerary planning to local tips, we make travel simple and insightful.",
            },
            {
              title: "🤖 Backed by AI",
              desc:
                "Our system integrates LangGraph, FastAPI, and real-time tools to help you make smart decisions effortlessly.",
            },
            {
              title: "🌐 Always Global",
              desc:
                "From India to the USA, Explora.ai supports worldwide travel with scalable AI planning that works across time zones.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex-1 border border-white/20 rounded-3xl p-10 backdrop-blur-lg bg-gray-800 hover:bg-black/70 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {item.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Visual Element */}
        <div className="text-center mt-24">
          <div className="inline-flex items-center gap-4 text-white/80">
            <div className="w-20 h-px bg-white/40"></div>
            <span className="text-sm md:text-base font-light tracking-wide">
              AI-POWERED TRAVEL EXPERIENCE
            </span>
            <div className="w-20 h-px bg-white/40"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
