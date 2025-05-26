import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function CourseInfoForm() {

  const [formData, setFormData] = useState({
    courseTitle: '',
    courseSlug: '',
    aboutCourse: '',
    regularPrice: '',
    discountPrice: '',
    courseCategories: '',
    file: null
  })

  const { courseTitle, courseSlug, aboutCourse, regularPrice, discountPrice, courseCategories, file } = formData;

  const handleOnChange = (e) => {
    const { name, type, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData", formData);

    const data = new FormData();
    data.append('courseTitle', courseTitle)
    data.append('courseSlug', courseSlug)
    data.append('aboutCourse', aboutCourse)
    data.append('regularPrice', regularPrice)
    data.append('discountPrice', discountPrice)
    data.append('courseCategories', courseCategories)
    data.append('file', file)

    console.log("Printing Data:", data);

    try {
      const res = await axios.post("http://localhost:4000/api/course/createCourse", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Success:", res.data);
      toast.success('Course add successfully')

      setFormData({
        courseTitle: '',
        courseSlug: '',
        aboutCourse: '',
        regularPrice: '',
        discountPrice: '',
        courseCategories: '',
        file: null
      })
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-xl font-semibold">Course Info</h2>

        <form onSubmit={handleOnSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Course Title</label>
              <input
                type="text"
                placeholder="Learning JavaScript With Imagination"
                name='courseTitle'
                value={courseTitle}
                onChange={handleOnChange}
                className="mt-1 py-2 px-4 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Course Slug</label>
              <input
                type="text"
                placeholder="Learning-JavaScript-With-Imagination"
                name='courseSlug'
                value={courseSlug}
                onChange={handleOnChange}
                className="mt-1 block py-2 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block my-2 text-sm font-medium text-gray-700">About Course</label>
            <textarea
              placeholder="Write description..."
              rows={3}
              name='aboutCourse'
              value={aboutCourse}
              onChange={handleOnChange}
              className="mt-1 block py-2 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-medium mb-4">Course Price</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Regular Price (₹)</label>
                <input
                  type="text"
                  placeholder="₹ 11,999"
                  name='regularPrice'
                  value={regularPrice}
                  onChange={handleOnChange}
                  className="mt-1 block py-2 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Discount Price (₹)</label>
                <input
                  type="text"
                  placeholder="₹ 4,999"
                  name='discountPrice'
                  value={discountPrice}
                  onChange={handleOnChange}
                  className="mt-1 block py-2 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Choose Categories</label>
            <input
              type="text"
              placeholder="Design, Development"
              name='courseCategories'
              value={courseCategories}
              onChange={handleOnChange}
              className="mt-1 block py-2 px-4 w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
            <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <label className="cursor-pointer flex flex-col items-center">
                <svg
                  className="w-8 h-8 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l-3-3m3 3l3-3m6-6h.01M6.938 4.938a2.5 2.5 0 013.535 0L12 6.464l1.527-1.526a2.5 2.5 0 113.535 3.535L12 13.536l-5.061-5.061a2.5 2.5 0 010-3.535z"
                  />
                </svg>
                <span className="text-sm text-gray-600">Choose a File</span>
                <input type="file" className="hidden" name='file' onChange={handleOnChange} />
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500 text-center">
              Size: 700*430 pixels, File Support: JPG, JPEG, PNG, GIF, WEBP
            </p>
          </div>

          <div className="text-right">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Update Info
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
