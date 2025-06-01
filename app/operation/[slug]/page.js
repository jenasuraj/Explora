"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ItineraryDayCard from "@/ui/ItineraryDayCard";
import axios from "axios";

const OperationSlugPage = () => {
  const searchParams = useSearchParams();
  const resultParam = searchParams.get("result");
  const [finalData, setFinalData] = useState(null);
  const [innerParsedData, setInnerParsedData] = useState(null);
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    if (resultParam) {
      try {
        const cleaned = resultParam.replace(/^```json\s*/i, "").replace(/^```/, "").replace(/```$/, "");
        const parsed = JSON.parse(cleaned);
        setFinalData(parsed);

        if (parsed.final) {
          const innerCleaned = parsed.final.replace(/^```json\s*/i, "").replace(/^```/, "").replace(/```$/, "");
          setInnerParsedData(JSON.parse(innerCleaned));
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [resultParam]);

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
      console.error("Pexels API error:", error.message);
      return null;
    }
  };

  useEffect(() => {
    if (!innerParsedData || !finalData?.destination) return;

    const loadImages = async () => {
      const temp = {};

      for (const dayKey of Object.keys(innerParsedData)) {
        const day = innerParsedData[dayKey];
        temp[dayKey] = {};

        if (day.Breakfast) temp[dayKey].breakfast = await fetchImage(finalData.destination, day.Breakfast.Restaurant);
        if (day.Lunch) temp[dayKey].lunch = await fetchImage(finalData.destination, day.Lunch.Restaurant);
        if (day.Dinner) temp[dayKey].dinner = await fetchImage(finalData.destination, day.Dinner.Restaurant);
        if (day["Morning Activity"]) temp[dayKey].morning = await fetchImage(finalData.destination, day["Morning Activity"].Place);
        if (day["Afternoon Activity"]) temp[dayKey].afternoon = await fetchImage(finalData.destination, day["Afternoon Activity"].Place);
      }

      setImageData(temp);
    };

    loadImages();
  }, [innerParsedData, finalData]);

console.log("innerparsed data is",innerParsedData)

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-10">
     
      {innerParsedData && (
        <div className="max-w-5xl mx-auto space-y-6">
          {Object.keys(innerParsedData)
            .filter((key) => key.startsWith("Day"))
            .map((dayKey) => (
              <ItineraryDayCard
                key={dayKey}
                dayKey={dayKey}
                day={innerParsedData[dayKey]}
                destination={finalData.destination}
                images={imageData[dayKey] || {}}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default OperationSlugPage;
