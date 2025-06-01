import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  console.log("re-rendering")
  const arr = ["  What is the most loved destination?","What day do people often use for a trip?"]
  const[inputData,setInputData]=useState('')
  const[aiResponse,setAiResponse] = useState('')


  const handleChange = (e)=>{
    setInputData(e.target.value)
  }
  const setData = (item)=>
  {
  setInputData(item)
  }

const animateResponse = (text) => {
  const words = text.split(" ");
  let index = 0;
  setAiResponse("");

  const interval = setInterval(() => {
    if (index < words.length) {
      setAiResponse(prev => prev + (index > 0 ? " " : "") + words[index]);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 100);
};

const pushData = async () => {
  if (!inputData.trim()) {
    alert("Put data in the input field first, jackass 😅");
  } else {
    try {
      const response = await axios.post('http://127.0.0.1:8000/submit', { inputData });
      animateResponse(response.data); // animate instead of setting directly
    } catch (error) {
      console.log("Error sending data to FastAPI", error);
    }
    setInputData('');
  }
};


  return (
    <>
      <section className="w-[95%] max-w-6xl mx-auto min-h-[40vh] shadow-2xl border border-gray-100 rounded-lg flex flex-col md:flex-row p-4 gap-4">
        {/* Left section */}
        <div className="w-full min-h-[30vh] md:w-1/2 md:min-h-full rounded-lg bg-gray-200 p-6">
          <p className="font-mono text-md">
         {aiResponse ? aiResponse : ' I am your AI assistant. Ask me whatever you want, like the most visited destination?'}
          </p>
        </div>

        {/* Right section */}
        <div className="w-full md:w-1/2 min-h-full p-2 flex flex-col justify-center gap-4">
           
          {arr.map( (item,index)=>{
            return(
            <div key={index} className='hidden md:block' onClick={()=>setData(item)}>
                <p className="text-black bg-white text-md border border-black rounded-sm px-5 py-2 cursor-pointer">
            {item}
          </p>
              </div>
            )})}


          <textarea onChange={handleChange}
            className="p-2 border border-gray-400 rounded-lg"
            placeholder="I am your AI assistant, ask me"
            value={inputData}
          />
          <button onClick={pushData}
           className="text-white bg-black text-md rounded-sm px-6 py-3 hover:border hover:border-black hover:bg-white hover:text-black">
            Ask me!
          </button>

        </div>
      </section>
    </>
  );
};

export default ChatBot;
