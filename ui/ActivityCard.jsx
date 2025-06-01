"use client";

import Image from "next/image";
import { GiHouse } from "react-icons/gi";

const ActivityCard = ({ timeOfDay, icon: Icon, data, destination, imageUrl }) => {
  if (!data) return null;

  return (
    <li className="flex flex-col sm:flex-row justify-between gap-4 border border-gray-700 p-4 sm:p-6 rounded-md">
      <div className="flex-1">
        <span className="text-white font-semibold flex items-center gap-2">
          <Icon size={24} /> {timeOfDay} Activity:
        </span>
        <p className="text-white mt-2 flex items-center gap-2">
          <GiHouse size={20} /> {data.Place}
        </p>
        <p className="text-gray-400 text-sm mt-1">{data.Description}</p>
        <button className="mt-4 px-3 py-1 inline-block border border-gray-600 text-gray-400 rounded-md hover:bg-purple-600 hover:text-white transition-colors">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.Place)},${encodeURIComponent(destination)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white no-underline"
          >
            Visit the place
          </a>
        </button>
      </div>

      <div className="w-full sm:w-1/2 max-w-[300px] h-[150px] sm:h-[200px] mt-4 sm:mt-0 overflow-hidden rounded-md">
        {imageUrl ? (
          <Image src={imageUrl} alt={`${timeOfDay} Activity`} width={300} height={200} className="object-cover w-full h-full" />
        ) : (
          <p className="text-gray-500 text-center mt-8">Loading image...</p>
        )}
      </div>
    </li>
  );
};

export default ActivityCard;
