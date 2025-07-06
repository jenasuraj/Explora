"use client";

import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white text-black px-6 py-20 font-sans">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">What is Explora.ai?</h1>
        <p className="text-lg text-gray-800 leading-relaxed">
          Explora.ai helps you plan smarter trips using AI. Whether you're exploring new places or optimizing
          travel time, our tools adapt to your needs, giving real-time recommendations with intelligent planning.
        </p>

        <Link href="/about/more">
          <button className="mt-10 px-8 py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-200">
            Know a bit more →
          </button>
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-16 w-3/4 mx-auto"></div>

      {/* Highlights Section */}
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
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
            className="border border-black rounded-xl p-6 shadow-sm hover:shadow-md transition-all bg-white"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AboutPage;
