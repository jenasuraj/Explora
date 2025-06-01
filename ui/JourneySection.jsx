"use client";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { SlRefresh } from "react-icons/sl";
import { useRouter } from "next/navigation";

const JourneySection = ({ formData, result, setShow, setResult }) => {
  const router = useRouter();

  const handleSeeJourney = () => {
    const slug = encodeURIComponent(`${formData.destination}-${formData.travelDays}days`);
    router.push(`/operation/${slug}?result=${encodeURIComponent(JSON.stringify(result))}`);
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {/* Modal Box */}
        <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Journey</h2>
          <p className="text-gray-600">Choose an action:</p>

          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <button
              disabled={!(formData.destination && formData.travelDays && formData.travelStyle)}
              className={`border border-green-500 text-green-600 px-4 py-2 rounded-full flex items-center justify-center gap-2 transition 
                hover:bg-green-500 hover:text-white 
                ${
                  !(formData.destination && formData.travelDays && formData.travelStyle)
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              onClick={handleSeeJourney}
            >
              See journey <CiSearch size={20} />
            </button>

            <button
              className="border border-red-500 text-red-500 px-4 py-2 rounded-full flex items-center justify-center gap-2 transition hover:bg-red-500 hover:text-white"
              onClick={() => {
                setShow(false);
                setResult(null);
              }}
            >
              Refresh <SlRefresh size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JourneySection;
