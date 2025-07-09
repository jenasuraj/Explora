import React from 'react'

const Section4 = () => {
  return (
    <>
      <section className="min-h-[50vh] w-full bg-gradient-to-b mt-10 px-8 py-20 text-white md:min-h-screen lg:min-h-[70vh]" data-aos="fade-up"
     data-aos-duration="3000">
        <article className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Why Choose Explora.ai?</h2>
          <p className="text-lg mb-8 leading-relaxed text-black">
            Our AI understands your preferences, budget, and travel history to suggest destinations
            that are uniquely tailored to you. Whether it's a relaxing getaway or an adventurous escape,
            Vlora.ai ensures your journey starts smarter.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-10 text-left md:flex md:flex-col lg:flex lg:flex-row lg:gap-2">
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
  )
}

export default Section4
