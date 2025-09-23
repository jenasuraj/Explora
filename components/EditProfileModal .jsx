"use client";
import { RxCross1 } from "react-icons/rx";
import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { useUser } from "@clerk/nextjs";


export default function EditProfileModal({loading,setLoading,tempFormData, setTempFormData, refresh, setRefresh, isOpen, onClose, formData, setFormData }) {
  if (!isOpen) return null;
  const { isSignedIn, isLoaded, user } = useUser();
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setTempFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };


  const handleSubmit = async()=>{
    setLoading(true)
  if (!isLoaded || !isSignedIn) {
    console.log("User not signed in!");
    return;
  }
  const userId = user?.id;
   try{
        const uploadData = new FormData();
        uploadData.append('userId',userId)
        uploadData.append('name',tempFormData.name)
        uploadData.append('about',tempFormData.about)
        uploadData.append('email',tempFormData.email)
        uploadData.append('profile',tempFormData.profile)
        uploadData.append('banner',tempFormData.banner)

        const response = await axios.post('/api/profile',uploadData)
        console.log("final data is",response.data.data)
        if(response){
            const finalResponse = response.data.data
            setFormData({name:finalResponse.name,email:finalResponse.email,
            about:finalResponse.about,profile:finalResponse.profileImg,
            banner:finalResponse.bannerImg})
            setRefresh((prev) => !prev);
            setLoading(false)
            onclose()
          }
        else{
            console.log("error !")
        }
   }
   catch(error){
    console.log("error in submitting data to DB...")
   }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300">
     {loading ? (
      <p className="text-white">Loading</p>
     ):(
       <div className="bg-black text-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative transform scale-95 animate-[fadeIn_0.2s_ease-out_forwards]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <RxCross1 size={22} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Edit Profile
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={tempFormData.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-gray-800 p-2 outline-none border border-gray-700 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            name="about"
            value={tempFormData.about}
            onChange={handleChange}
            rows="4"
            className="w-full h-auto rounded-xl bg-gray-800 p-2 outline-none border border-gray-700 focus:border-blue-500"
            placeholder="Tell something about yourself..."
          />
        </div>

        {/* Profile Image Input */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Profile Image</label>
          <input
            type="file"
            name="profile"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
        </div>

        {/* Banner Image Input */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Banner Image</label>
          <input
            type="file"
            name="banner"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center gap-2"
          >
            <MdCancel size={18}/> Cancel
          </button>
          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center gap-2" onClick={handleSubmit}>
            <FaSave size={18}/> Save Changes
          </button>
        </div>
      </div>
     )}
    </div>
  );
}
