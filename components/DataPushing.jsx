"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "@/components/Form";
import Loader from "./Loader";
import JourneySection from "./JourneySection";
import ChatBot from "./ChatBot";


const DataPushing = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    travelDays: "",
    destination: "",
    travelStyle: "",
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const sendData = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:8000/", {
          total_days: formData.travelDays,
          destination: formData.destination,
          travel_type: formData.travelStyle,
        });

        console.log("Response from fastapi", response.data);
        setResult(response.data);
      } catch (error) {
        console.log("error pushing data to fastapi", error);
      } finally {
        setLoading(false);
      }
    };

    if (show) {
      sendData();
    }
  }, [show]);




  return (
    <>
      <Form
        show={show}
        setShow={setShow}
        formData={formData}
        setFormData={setFormData}
      />
       <ChatBot/>
      {show && loading && <Loader />}
      {show && !loading && result && (
        <JourneySection
          formData={formData}
          result={result}
          setShow={setShow}
          setResult={setResult}
        />
      )}
     
    </>
  );
};

export default DataPushing;
