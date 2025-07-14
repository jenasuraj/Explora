"use client"

import { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState('');
  const [timeGreeting, setTimeGreeting] = useState('');
  const [formData, setFormData] = useState({
    description: '',
    days: '',
    radius: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClick = async () => {
    if (!formData.description || !formData.days || !formData.radius) {
      setErrorMessage('Please fill in all fields!');
      return;  
    }
    setErrorMessage('');
    try {
      const mainResponse = await axios.post('http://127.0.0.1:8000', formData);
      setResponse(mainResponse.data);
     } catch (error) {
      console.log("Error while sending data to FastAPI", error);
      setErrorMessage("Server error. Try again later.");
    }
  };

if (response)
{
const obj = JSON.parse(response.final_data);
console.log("Parsed object:", obj);
console.log("Now the type is", typeof obj); // 'object'
}


  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12 && hour >= 5) setTimeGreeting('Good Morning ⛅');
    else if (hour >= 12 && hour < 17) setTimeGreeting('Good Afternoon 🌞');
    else if (hour >= 17 && hour < 24) setTimeGreeting('Good Evening 🌙');
    else setTimeGreeting("It's Night Time");
  }, []);

  useEffect(() => {
    if (response && response.messages) {
      const lastMessage = response.messages[response.messages.length - 1]?.content;
      if (lastMessage) console.log(lastMessage);
    }
  }, [response]);

  return (
    <section className="w-full min-h-screen p-6 flex justify-center items-center">
      <div className="shadow-lg flex justify-center items-center gap-5 flex-col px-6 py-6 w-full min-h-[50vh] border border-gray-300 rounded-4xl bg-white mb-30 lg:w-1/2">
        <header className="text-4xl text-center">
          Hey there, {timeGreeting} 
        </header>
        <p className="text-md text-center">
          Got confused where to go? Don't worry, I am here to help. Just give me a command!
        </p>

        <textarea
          placeholder="Enter something*"
          className="text-gray-600 w-full min-h-20 border border-gray-300 rounded-md p-2"
          value={formData.description}
          onChange={handleChange}
          name="description"
        />

        <div className="h-auto w-full py-1 gap-5 lg:flex">
          <input
            placeholder="Enter the radius* (Ex: 200km)"
            name="radius"
            value={formData.radius}
            onChange={handleChange}
            className="w-full h-auto border border-gray-300 p-2"
          />
          <input
            placeholder="Enter total days* (Ex: 10-15 days)"
            name="days"
            value={formData.days}
            onChange={handleChange}
            className="w-full h-auto border border-gray-300 p-2"
          />
        </div>

        <button
          className="cursor-pointer w-full h-auto bg-black text-white p-2 hover:bg-white hover:text-black hover:border hover:border-black "
          onClick={handleClick}
        >
          Let's go
        </button>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    </section>
  );
};

export default Chatbot;
