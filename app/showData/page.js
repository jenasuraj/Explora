"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ShowDataPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [dataDetails, setDataDetails] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchImage = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const result = await axios.post("http://127.0.0.1:8000", { query });
        console.log("Raw response from FastAPI:", result.data);
        console.log("Image URL received:", result.data.image_url);
        console.log("Place name received:", result.data.place_name);
        console.log("Place data received:", result.data.description);
        setImageUrl(result.data.image_url);
        setPlaceName(result.data.place_name);
        setDataDetails(result.data.description);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [query]);


  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 border-4 border-t-4 border-t-purple-900 border-gray-300 rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-300">
            Fetching location data...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <p className="text-red-500 text-lg font-medium bg-red-100/10 p-4 rounded-lg">
          {error}
        </p>
      )}

      {/* Main Content */}
      {!loading && !error && query && (
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 border border-purple-900 rounded-xl shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="relative">
            <img
              src={imageUrl}
              alt={placeName}
              className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setError("Failed to load image")}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-2xl font-bold text-white drop-shadow-md">
                {placeName}
              </h2>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">
                About {placeName}
              </h3>
              <p className="text-gray-200 leading-relaxed">
                {dataDetails || "No description available."}
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <p>Data fetched on: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* No Query State */}
      {!query && (
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
          <p className="text-2xl font-semibold text-gray-300">
            Please provide a query to see location details
          </p>
          <p className="text-gray-400 mt-2">
            Example: ?query=Paris in the URL
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowDataPage;