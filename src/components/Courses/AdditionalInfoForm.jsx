import React, { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

export default function AdditionalInfoForm() {

  const [formData, setFormData] = useState({
    language: "",
    startDate: "",
    requirements: "",
    description: "",
    hour: "",
    minute: "",
    courseTag: "",
  });

  const {
    language,
    startDate,
    requirements,
    description,
    hour,
    minute,
    courseTag,
  } = formData;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData", formData);

    try {
      const res = await axios.post("http://localhost:4000/api/course/additionalInformaction", formData);
      console.log("Success:", res.data);
      toast.success('Data Submit successfully!')

      // Optional: Reset form
      setFormData({
        language: "",
        startDate: "",
        requirements: "",
        description: "",
        hour: "",
        minute: "",
        courseTag: "",
      });
    } catch (err) {
      // console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Additional Information</h2>
        <button type="button">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleOnSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language */}
        <div>
          <label className="block mb-1 font-medium">Language</label>
          <input
            type="text"
            placeholder="English"
            name="language"
            value={language}
            onChange={handleOnChange}
            className="w-full border-gray-300 shadow-sm px-4 py-2 rounded"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleOnChange}
            className="w-full px-4 py-2 border-gray-300 shadow-sm rounded"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block mb-1 font-medium">Requirements</label>
          <textarea
            rows="4"
            placeholder="Add course requirements here."
            className="w-full px-4 py-2 border-gray-300 shadow-sm rounded"
            name="requirements"
            value={requirements}
            onChange={handleOnChange}
          ></textarea>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            rows="4"
            placeholder="Add course description here."
            className="w-full px-4 py-2 border-gray-300 shadow-sm rounded"
            name="description"
            value={description}
            onChange={handleOnChange}
          ></textarea>
        </div>

        {/* Total Duration */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Total Course Duration</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Hours (e.g. 01)"
              name="hour"
              value={hour}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border-gray-300 shadow-sm rounded"
            />
            <input
              type="text"
              placeholder="Minutes (e.g. 30)"
              name="minute"
              value={minute}
              onChange={handleOnChange}
              className="w-full px-4 py-2 border-gray-300 shadow-sm rounded"
            />
          </div>
        </div>

        {/* Course Tags */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Course Tags</label>
          <textarea
            rows="3"
            placeholder="e.g. JavaScript, React, Backend"
            className="w-full px-4 py-2 border-gray-300 shadow-sm rounded"
            name="courseTag"
            value={courseTag}
            onChange={handleOnChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Info
          </button>
        </div>
      </form>
    </div>
  );
}
