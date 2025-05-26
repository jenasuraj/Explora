import Link from "next/link";
import img from '@/public/plan.png'
import mapimg from '@/public/map.png'

import Image from "next/image";
export const metadata = {
  title: "Vlora.ai - Smart Travel Destination Picker",
  description: "Let our smartest AI pick your perfect destination and experience travel the smarter way with Vlora.ai.",
  keywords: ["AI travel", "smart travel", "travel destination", "Vlora.ai", "travel planning"],
  authors: [{ name: "Vlora.ai Team" }],
  openGraph: {
    title: "Vlora.ai - Smart Travel Destination Picker",
    description: "Experience travel the smarter way with Vlora.ai's AI-powered destination suggestions.",
    url: "https://yourdomain.com",
    siteName: "Vlora.ai",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vlora.ai Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function Home() {
  return (
    <>
      <section className="min-h-[70vh] bg-black w-5/6 rounded-t-3xl flex justify-center items-center rounded-b-2xl mx-auto">
        <header className="text-white flex items-center justify-center flex-col text-center">
          <h1 className="text-5xl">Welcome to Vlora.ai</h1>
          <p className="text-lg mt-5 max-w-xl">
            Let our smartest AI pick your perfect destination, experience travel the smarter way.
            Give it a try and unlock where brilliance takes you.
          </p>
          <Link href="/operation">
            <button className="mt-10 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all">
              Try Smarter
            </button>
          </Link>
        </header>
      </section>




<section className="min-h-[70vh] w-10/12 max-w-7xl mx-auto mt-10 bg-white shadow-xl rounded-t-3xl rounded-b-2xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Text Section */}
  <header className="text-center md:text-left md:w-1/2 space-y-4">
    <h1 className="text-4xl mb-5 sm:text-3xl lg:text-5xl  text-gray-800">
      Generate Your Dream Travel Plan
    </h1>
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
      Let our AI-powered travel planner design the perfect itinerary for you — whether you're exploring
      ancient landmarks, relaxing on tropical beaches, or discovering hidden gems in bustling cities.
      Just tell us your preferences, and we’ll create a personalized, efficient, and unforgettable
      travel experience tailored just for you.
    </p>
  </header>

  {/* Image Section */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image
      src={img}
      alt="AI Travel Planning Illustration"
      className="rounded-xl object-cover"
      width={500}
      height={400}
      priority
    />
  </div>
</section>




<section className="min-h-[70vh] w-10/12 max-w-7xl mx-auto mt-10 bg-white shadow-xl rounded-t-3xl rounded-b-2xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Text Section */}
  <div className="w-full md:w-1/2 flex justify-center">
    <Image
      src={mapimg}
      alt="AI Travel Planning Illustration"
      className="rounded-xl object-cover"
      width={500}
      height={400}
      priority
    />
  </div>

  <header className="text-center md:text-left md:w-1/2 space-y-4">
    <h1 className="text-4xl sm:text-3xl lg:text-5xl  text-gray-800 mb-5">
      See the destination in map
    </h1>
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
    You can explore this place in more detail on Google Maps.
Click the link to see its exact location, nearby landmarks, and get directions easily.
Experience the place precisely as if you were there!
    </p>
  </header>

  {/* Image Section */}

</section>




      <section className="min-h-[50vh] w-full bg-gradient-to-b mt-10 px-8 py-20 text-white">
        <article className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Why Choose Vlora.ai?</h2>
          <p className="text-lg mb-8 leading-relaxed text-black">
            Our AI understands your preferences, budget, and travel history to suggest destinations
            that are uniquely tailored to you. Whether it's a relaxing getaway or an adventurous escape,
            Vlora.ai ensures your journey starts smarter.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-10 text-left">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
              <p>Receive AI-powered suggestions based on real data and personal preferences.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Seamless Planning</h3>
              <p>From flights to stays — let us streamline your entire travel plan.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Real-Time Insights</h3>
              <p>Get weather, reviews, and local tips live from your dream destinations.</p>
            </div>
          </div>
        </article>
      </section>




    </>
  );
}
