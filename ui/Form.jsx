import React from 'react'
import { BsStars } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const Form = ({show,setShow,formData,setFormData}) => {
 

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showPage = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setShow(true); 
  };

const isFormValid = formData.destination && formData.travelDays && formData.travelStyle;


  return (
    <>
     <section className={`w-4/5 ${show ? 'h-auto' : 'min-h-[65vh]'} mx-auto p-8`}>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end" onSubmit={showPage}>
          {/* Travel Days Dropdown */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Travel Days</label>
            <select
              name="travelDays"
              className="p-3 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-700 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-300 hover:shadow-md"
              value={formData.travelDays}
              onChange={handleChange}
            >
              <option value="" disabled>Travel Days</option>
              <option value="3">3 Days</option>
              <option value="5">5 Days</option>
              <option value="7">7 Days</option>
              <option value="10">10+ Days</option>
            </select>
          </div>
          {/* Destination Search */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Destination</label>
            <div className="relative">
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Where to next?"
                className="p-3 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm w-full text-gray-700 pr-10 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-300 hover:shadow-md"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500">
                <CiSearch size={20} />
              </span>
            </div>
          </div>
          {/* Travel Style Dropdown */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">Travel Style</label>
            <select
              name="travelStyle"
              value={formData.travelStyle}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-700 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-300 hover:shadow-md"
            >
              <option value="" disabled>Travel Style</option>
              <option value="luxury">Luxury</option>
              <option value="budget">Budget</option>
              <option value="adventure">Adventure</option>
              <option value="relaxing">Relaxing</option>
            </select>
          </div>
          <div className="md:col-span-3 flex justify-end">
          <button
  type="button"
  disabled={!isFormValid}
  onClick={() => setShow(true)}
  className={`mt-4 px-6 py-2 rounded-md text-white font-semibold transition 
    ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-blue-300 cursor-not-allowed'}`}
>
  Plan My Trip
</button>

          </div>
        </form>
      </section>
    </>
  )
}

export default Form
