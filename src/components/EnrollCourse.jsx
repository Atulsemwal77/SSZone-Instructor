import React, { useState } from "react";
import img1 from '../assets/img1.png'
import { MdLockOutline } from "react-icons/md";

const coursesData = [
  {
    title: "Learning JavaScript With Imagination",
    instructor: "Wilson",
    rating: 4.2,
    reviews: 2,
    lessons: 23,
    duration: "05 Weeks",
    image: img1,
  },
];

const TabButton = ({ label, active, onClick}) => (
  <button
    className={`px-4 py-2 font-semibold ${
      active ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const CourseCard = ({ data, button, percent, showLockIcon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md w-72">
    <div className="relative">
      <img src={data.image} alt="course" className="w-full h-40 object-cover rounded-md" />
      <button className="absolute top-2 right-2 text-red-500 text-xl">🤍</button>
    </div>
    <span className="text-xs inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 mt-2">
      Development
    </span>
    <h2 className="text-md font-semibold mt-2">{data.title}</h2>
    <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
      <div className="flex">
      <img
        src="https://i.pravatar.cc/24"
        alt="avatar"
        className="w-5 h-5 rounded-full mr-2"
      />
      {data.instructor}
      </div>
      <div>
      <span className="ml-2 text-yellow-500">★ {data.rating}</span>
      <span className="ml-1">({data.reviews} Reviews)</span>
      </div>
    </div>
    <div >
    <div className="flex justify-between">
      <p className="text-xs text-gray-400 mt-1"> Complete</p>
      <p className="text-xs text-gray-400 mt-1">{percent}%</p>
    </div>
     <input type="range" className="w-full " />
    </div>
    <div className="flex gap-6 text-sm text-gray-600 mt-2">
      <span>📘 {data.lessons} Lesson</span>
      <span>⏱ {data.duration}</span>
    </div>
    <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition flex justify-center items-center gap-2">
      {button}
      {showLockIcon && <MdLockOutline />}
    </button>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState("Enroll");

  const renderContent = () => {
    switch (activeTab) {
      case "Enroll":
        return (
          <div className="flex flex-wrap gap-4 mt-6">
            {coursesData.map((course, i) => (
              <CourseCard key={i} data={course} button="Start Now" percent="0" />
            ))}
          </div>
        );
      case "Active":
        return (
        <div className="flex flex-wrap gap-4 mt-6">
        {coursesData.map((course, i) => (
          <CourseCard key={i} data={course} button="Download Certificate" percent="88" showLockIcon={true}/>
        ))}
        </div>
        )
      case "Completed":
        return (
          <div className="flex flex-wrap gap-4 mt-6">
          {coursesData.map((course, i) => (
            <CourseCard key={i} data={course} button="Download Certificate" percent="100"/>
          ))}
          </div>
          )
      default:
        return null;
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Enroll courses</h1>
      <div className="flex space-x-6 border-b pb-2">
        <TabButton
          label="Enroll Courses"
          active={activeTab === "Enroll"}
          onClick={() => setActiveTab("Enroll")}
        />
        <TabButton
          label="Active Courses"
          active={activeTab === "Active"}
          onClick={() => setActiveTab("Active")}
        />
        <TabButton
          label="Completed Courses"
          active={activeTab === "Completed"}
          onClick={() => setActiveTab("Completed")}
        />
      </div>
      {renderContent()}
    </div>
  );
};

export default App;
