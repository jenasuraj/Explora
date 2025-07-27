"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = ({firstResponse,setFirstResponse,finalData,setFinalData}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeGreeting, setTimeGreeting] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    days: '',
    radius: ''
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12 && hour >= 5) setTimeGreeting('Good Morning ⛅');
    else if (hour >= 12 && hour < 17) setTimeGreeting('Good Afternoon 🌞');
    else if (hour >= 17 && hour < 24) setTimeGreeting('Good Evening 🌙');
    else setTimeGreeting("It's Night Time");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClick = async () => {
    let mixed_data = '';
    setLoading(true);

    if (!firstResponse) {
      if (!formData.description || !formData.days || !formData.radius) {
        setErrorMessage('Please fill in all fields!');
        setLoading(false);
        return;
      }
      mixed_data = `user wants: ${formData.description} and within a total radius of: ${formData.radius} and the tour should be for: ${formData.days}`;
    } else {
      if (!formData.description.trim()) {
        setErrorMessage("Enter a message.");
        setLoading(false);
        return;
      }
      mixed_data = `user wants: ${formData.description}`;
    }

    setErrorMessage('');
    try {
      const res = await axios.post('http://127.0.0.1:8000', { mixed_data });
      setFirstResponse(true);
      setFormData(prev => ({ ...prev, description: '' }));
      setFinalData(
      typeof res.data.final_data === "string"
      ? JSON.parse(res.data.final_data)
      : res.data.final_data
      );
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-semibold text-black">Generating your plan...</p>
      </div>
    );
  }

if (firstResponse) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 sm:px-6">
      <div className="mx-auto w-full sm:w-1/2 bg-white shadow-xl border border-gray-300 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <textarea
            placeholder="Enter next command..."
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={1}
            className="flex-1 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 text-sm"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-600 text-xs mt-1 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}



  // 👇 Full UI before first response
  return (
    <section className="container mx-auto p-4 sm:p-6 flex justify-center items-center min-h-[50vh] mt-10">
      <div className="shadow-md flex flex-col gap-5 px-4 sm:px-6 py-6 w-full max-w-2xl border border-gray-200 rounded-xl bg-white">
        <header className="text-3xl sm:text-4xl text-center font-semibold text-gray-800">
          Hey there, {timeGreeting}
        </header>
        <p className="text-sm sm:text-md text-center text-gray-600">
          Got confused where to go? I'm here to help. Just give me a command!
        </p>

        <textarea
          placeholder="Enter something* (e.g., 'Plan a trip in San Francisco')"
          className="text-gray-600 w-full min-h-[100px] border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={handleChange}
          name="description"
          aria-label="Trip description"
        />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <input
            placeholder="Enter the radius* (e.g., 200km)"
            name="radius"
            value={formData.radius}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Trip radius"
          />
          <input
            placeholder="Enter total days* (e.g., 10-15 days)"
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Trip duration"
          />
        </div>

        <button
          className="w-full bg-gray-900 text-white p-3 rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleClick}
          aria-label="Generate trip plan"
        >
          Let's go
        </button>

        {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default Chatbot;
