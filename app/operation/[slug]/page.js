"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineFreeBreakfast, MdDinnerDining, MdOutlineHiking } from "react-icons/md";
import { GiHotMeal, GiHouse } from "react-icons/gi";
import { BsPersonWalking } from "react-icons/bs";
import Image from "next/image";
import axios from "axios";

const OperationSlugPage = () => {
  const searchParams = useSearchParams();
  const resultParam = searchParams.get("result");

  const [finalData, setFinalData] = useState(null);
  const [innerParsedData, setInnerParsedData] = useState(null);

  const [breakfastImages, setBreakfastImages] = useState({});
  const [lunchImages, setLunchImages] = useState({});
  const [dinnerImages, setDinnerImages] = useState({});
  const [morningImages, setMorningImages] = useState({});
  const [afternoonImages, setAfternoonImages] = useState({});

  // Parse URL data
  useEffect(() => {
    if (resultParam) {
      try {
        const cleaned = resultParam.replace(/^```json\s*/i, "").replace(/^```/, "").replace(/```$/, "");
        const parsed = JSON.parse(cleaned);
        setFinalData(parsed);

        if (parsed.final) {
          const innerCleaned = parsed.final.replace(/^```json\s*/i, "").replace(/^```/, "").replace(/```$/, "");
          const nestedJson = JSON.parse(innerCleaned);
          setInnerParsedData(nestedJson);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [resultParam]);

  // API Fetch Image
  const fetchImage = async (destination, queryText) => {
    const query = `${destination}, ${queryText}`;
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        params: { query, per_page: 1 },
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
        },
      });

      return response?.data?.photos?.[0]?.src?.original || null;
    } catch (error) {
      console.error("❌ Pexels API error:", error.message);
      return null;
    }
  };

  // Fetch all category images
  useEffect(() => {
    if (!innerParsedData || !finalData?.destination) return;

    const loadImages = async () => {
      const breakfast = {};
      const lunch = {};
      const dinner = {};
      const morning = {};
      const afternoon = {};

      for (const dayKey of Object.keys(innerParsedData)) {
        const day = innerParsedData[dayKey];

        if (day.Breakfast) {
          breakfast[dayKey] = await fetchImage(finalData.destination, day.Breakfast.Restaurant);
        }
        if (day.Lunch) {
          lunch[dayKey] = await fetchImage(finalData.destination, day.Lunch.Restaurant);
        }
        if (day.Dinner) {
          dinner[dayKey] = await fetchImage(finalData.destination, day.Dinner.Restaurant);
        }
        if (day["Morning Activity"]) {
          morning[dayKey] = await fetchImage(finalData.destination, day["Morning Activity"].Place);
        }
        if (day["Afternoon Activity"]) {
          afternoon[dayKey] = await fetchImage(finalData.destination, day["Afternoon Activity"].Place);
        }
      }

      setBreakfastImages(breakfast);
      setLunchImages(lunch);
      setDinnerImages(dinner);
      setMorningImages(morning);
      setAfternoonImages(afternoon);
    };

    loadImages();
  }, [innerParsedData, finalData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10">
      {innerParsedData && (
        <div className="max-w-5xl mx-auto space-y-6">
          {Object.keys(innerParsedData)
            .filter((key) => key.startsWith("Day"))
            .map((dayKey) => {
              const day = innerParsedData[dayKey];
              return (
                <div
                  key={dayKey}
                  className="bg-black bg-opacity-90 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-100 border-b-2 border-gradient-to-r from-purple-500 to-pink-500 pb-2 mb-4">
                    {dayKey}
                  </h3>

                  <ul className="space-y-4">
                    {/* Breakfast */}
                    {day.Breakfast && (
                      <li className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-700 p-4 sm:p-6 rounded-md">
                        <div className="flex-1">
                          <span className="text-white font-semibold flex items-center gap-2">
                            <MdOutlineFreeBreakfast size={24} /> Breakfast:
                          </span>
                          <p className="text-white mt-2 flex items-center gap-2">
                            <GiHouse size={20} /> {day.Breakfast.Restaurant}
                          </p>
                          <p className="text-gray-400 text-sm mt-1">{day.Breakfast.Description}</p>
                          <button className="mt-4 px-3 py-1 inline-block border border-gray-600 text-gray-400 rounded-md hover:bg-purple-600 hover:text-white transition-colors">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                day.Breakfast.Restaurant
                              )},${encodeURIComponent(finalData.destination)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors no-underline"
                            >
                              Visit the place
                            </a>
                          </button>
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[300px] h-[150px] sm:h-[200px] mt-4 sm:mt-0 overflow-hidden rounded-md">
                          {breakfastImages[dayKey] ? (
                            <Image
                              src={breakfastImages[dayKey]}
                              alt="Breakfast"
                              width={300}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <p className="text-gray-500 text-center mt-8">Loading image...</p>
                          )}
                        </div>
                      </li>
                    )}

                    {/* Lunch */}
                    {day.Lunch && (
                      <li className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-700 p-4 sm:p-6 rounded-md">
                        <div className="flex-1">
                          <span className="text-white font-semibold flex items-center gap-2">
                            <GiHotMeal size={24} /> Lunch:
                          </span>
                          <p className="text-white mt-2 flex items-center gap-2">
                            <GiHouse size={20} /> {day.Lunch.Restaurant}
                          </p>
                          <p className="text-gray-400 text-sm mt-1">{day.Lunch.Description}</p>
                          <button className="mt-4 px-3 py-1 inline-block border border-gray-600 text-gray-400 rounded-md hover:bg-purple-600 hover:text-white transition-colors">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                day.Lunch.Restaurant
                              )},${encodeURIComponent(finalData.destination)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors no-underline"
                            >
                              Visit the place
                            </a>
                          </button>
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[300px] h-[150px] sm:h-[200px] mt-4 sm:mt-0 overflow-hidden rounded-md">
                          {lunchImages[dayKey] ? (
                            <Image
                              src={lunchImages[dayKey]}
                              alt="Lunch"
                              width={300}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <p className="text-gray-500 text-center mt-8">Loading image...</p>
                          )}
                        </div>
                      </li>
                    )}

                    {/* Dinner */}
                    {day.Dinner && (
                      <li className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-700 p-4 sm:p-6 rounded-md">
                        <div className="flex-1">
                          <span className="text-white font-semibold flex items-center gap-2">
                            <MdDinnerDining size={24} /> Dinner:
                          </span>
                          <p className="text-white mt-2 flex items-center gap-2">
                            <GiHouse size={20} /> {day.Dinner.Restaurant}
                          </p>
                          <p className="text-gray-400 text-sm mt-1">{day.Dinner.Description}</p>
                          <button className="mt-4 px-3 py-1 inline-block border border-gray-600 text-gray-400 rounded-md hover:bg-purple-600 hover:text-white transition-colors">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                day.Dinner.Restaurant
                              )},${encodeURIComponent(finalData.destination)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors no-underline"
                            >
                              Visit the place
                            </a>
                          </button>
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[300px] h-[150px] sm:h-[200px] mt-4 sm:mt-0 overflow-hidden rounded-md">
                          {dinnerImages[dayKey] ? (
                            <Image
                              src={dinnerImages[dayKey]}
                              alt="Dinner"
                              width={300}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <p className="text-gray-500 text-center mt-8">Loading image...</p>
                          )}
                        </div>
                      </li>
                    )}

                    {/* Morning Activity */}
                    {day["Morning Activity"] && (
                      <li className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-700 p-4 sm:p-6 rounded-md">
                        <div className="flex-1">
                          <span className="text-white font-semibold flex items-center gap-2">
                            <MdOutlineHiking size={24} /> Morning Activity:
                          </span>
                          <p className="text-white mt-2 flex items-center gap-2">
                            <GiHouse size={20} /> {day["Morning Activity"].Place}
                          </p>
                          <p className="text-gray-400 text-sm mt-1">{day["Morning Activity"].Description}</p>
                          <button className="mt-4 px-3 py-1 inline-block border border-gray-600 text-gray-400 rounded-md hover:bg-purple-600 hover:text-white transition-colors">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                day["Morning Activity"].Place
                              )},${encodeURIComponent(finalData.destination)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors no-underline"
                            >
                              Visit the place
                            </a>
                          </button>
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[300px] h-[150px] sm:h-[200px] mt-4 sm:mt-0 overflow-hidden rounded-md">
                          {morningImages[dayKey] ? (
                            <Image
                              src={morningImages[dayKey]}
                              alt="Morning Activity"
                              width={300}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <p className="text-gray-500 text-center mt-8">Loading image...</p>
                          )}
                        </div>
                      </li>
                    )}

                    {/* Afternoon Activity */}
                    {day["Afternoon Activity"] && (
                      <li className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-700 p-4 sm:p-6 rounded-md">
                        <div className="flex-1">
                          <span className="text-white font-semibold flex items-center gap-2">
                            <BsPersonWalking size={24} /> Afternoon Activity:
                          </span>
                          <p className="text-white mt-2 flex items-center gap-2">
                            <GiHouse size={20} /> {day["Afternoon Activity"].Place}
                          </p>
                          <p className="text-gray-400 text-sm mt-1">{day["Afternoon Activity"].Description}</p>
                          <button className="mt-4 px-3 py-1 inline-block border border-gray-600 text-gray-400 rounded-md hover:bg-purple-600 hover:text-white transition-colors">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                day["Afternoon Activity"].Place
                              )},${encodeURIComponent(finalData.destination)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-white transition-colors no-underline"
                            >
                              Visit the place
                            </a>
                          </button>
                        </div>
                        <div className="w-full sm:w-1/2 max-w-[300px] h-[150px] sm:h-[200px] mt-4 sm:mt-0 overflow-hidden rounded-md">
                          {afternoonImages[dayKey] ? (
                            <Image
                              src={afternoonImages[dayKey]}
                              alt="Afternoon Activity"
                              width={300}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <p className="text-gray-500 text-center mt-8">Loading image...</p>
                          )}
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default OperationSlugPage;