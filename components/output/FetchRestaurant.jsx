
import { IoRestaurant } from "react-icons/io5";
import React, { useState } from 'react';

const FetchRestaurant = () => {
  const [showPage, setShowPage] = useState(false);

  const fetchRestaurants = () => {
    setShowPage(true);
  };

  return (
    <>
      {/* Modal Backdrop */}
      {showPage && (
        <div className="fixed inset-0 z-40  bg-white/80 backdrop-blur-sm flex items-center justify-center">
          {/* Modal Container */}
          <div className="bg-white w-[90%] min-h-[60vh] md:w-2/3 rounded-sm shadow-lg border border-gray-100 p-6 relative z-50 animate-fadeIn">
            <button
              onClick={() => setShowPage(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-extra-bold">
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">Available Restaurants</h2>
            <p>Here's the page</p>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <p className="gap-2 rounded-full w-fit flex items-center border border-gray-200 py-1 px-3 hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
        onClick={fetchRestaurants}>
        <IoRestaurant size={20} />
        Restaurant
      </p>
    </>
  );
};

export default FetchRestaurant;
