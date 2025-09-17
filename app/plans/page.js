"use client"

import React, { useEffect, useState } from "react"
import FetchImages from "@/components/output/FetchImages"
import axios from "axios"
import { MdPlace } from "react-icons/md"
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()  
  const [dataCollections, setDataCollections] = useState([])
  const [loading, setLoading] = useState(false)
  const [inputData, setInputData] = useState('')
  const [tempArr, setTempArr] = useState([]) 
  const [showCross, setShowCross] = useState(false)

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/crud")
        if (Array.isArray(response.data.message)) {
          setDataCollections(response.data.message)
        }
      } catch (error) {
        console.log("error in plans")
      }
      setLoading(false)
    }
    fetchAll()
  }, [])
  

  // ✅ Fixed version: returns shortened description
  const descriptionFunc = (description) => {
    if (!description) return ""
    const arr = description.split(" ")
    const limit = Math.floor(arr.length / 2) // show half words
    return arr.slice(0, limit).join(" ") + "..."
  }

  const filterOperation = () => {
    if(inputData && !showCross){
      const filteredData = dataCollections.filter((item) => item.place.toLowerCase().includes(inputData.toLowerCase()))
      setTempArr(filteredData)
      setShowCross(true)
    } else {
      setInputData('')
      setShowCross(false)
      setTempArr([])
    }
  }

  const handlePlanClick = (index) => {
    router.push(`/plans/${dataCollections[index].id}`)
  }

  return (
    <section className="flex flex-col justify-center items-center w-full min-h-screen">
      <div className="flex items-center my-6">
        <input 
          placeholder="Find your favorite place !" 
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="bg-none border border-gray-500 px-10 text-white py-2 rounded-l-full"
        />
        <button 
          className="rounded-r-full border border-gray-500 py-2 px-3"
          onClick={filterOperation}
        >
          {!showCross ? <CiSearch size={25} color="white"/> : <RxCross1 size={25}  color="white"/>}
        </button>
      </div>

      <div className={`${
        loading
          ? "flex min-h-screen w-full justify-center items-center text-5xl"
          : `grid gap-6 min-h-screen w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-10 lg:w-2/3 justify-center`}`
      }>
        {loading ? (
          <p className="text-2xl text-white">Loading....</p>
        ) : tempArr.length > 0 ? (
          tempArr.map((item, index) => {
            const description = item?.collection?.days?.[0]?.places?.[0]?.description
            return (
              <div 
                key={index} 
                onClick={() => handlePlanClick(index)}
                className="cursor-pointer relative border text-sm text-gray-300 shadow-2xl border-gray-500 rounded-md transition-transform hover:scale-105"
              >
                <FetchImages item={item.place} />
                {description && (
                  <div className="gap-2 flex flex-col absolute bottom-0 w-full bg-black/40 backdrop-blur-sm text-white text-xs p-3">
                    <p className="text-white flex text-md font-bold items-center gap-2">
                      <MdPlace size={20} />
                      {item.place}
                    </p>
                    <p className="text-gray-200 text-xs">
                      {descriptionFunc(description)}
                    </p>
                  </div>
                )}
              </div>
            )
          })
        ) : showCross && tempArr.length < 1 ? ( 
          <p className="text-white text-3xl col-span-full text-center">Search results empty...</p> 
        ) : dataCollections.length > 0 ? (
          dataCollections.map((item, index) => {
            const description = item?.collection?.days?.[0]?.places?.[0]?.description
            return (
              <div 
                onClick={() => handlePlanClick(index)}
                key={index}
                className="cursor-pointer relative border text-sm text-gray-300 shadow-2xl border-gray-500 rounded-md overflow-hidden transition-transform hover:scale-105"
              >
                <FetchImages item={item.place} />
                {description && (
                  <div className="gap-2 flex flex-col absolute bottom-0 w-full bg-black/40 backdrop-blur-sm text-white text-xs p-3">
                    <p className="text-white flex text-md font-bold items-center gap-2">
                      <MdPlace size={20} />
                      {item.place}
                    </p>
                    <p className="text-gray-200 text-xs">
                      {descriptionFunc(description)}
                    </p>
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <p className="text-2xl text-white col-span-full text-center">Nothing to show</p>
        )}
      </div>
    </section>
  )
}