import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Tab Button Component
const TabButton = ({ label, active, onClick }) => (
  <button
    className={`px-4 py-2 font-semibold ${
      active ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Course Card Component
const CourseCard = ({ data, handleDelete }) => (
  <div className="bg-white p-4 rounded-lg shadow-md w-72">
    <div className="relative">
      <img
        src={`http://localhost:4000/${data.courseThumbnail}`}
        alt={data.courseTitle}
        className="w-full h-40 object-cover rounded-md"
      />
      <button
        onClick={() => handleDelete(data._id)}
        className="absolute top-2 right-2 text-red-500 text-xl"
      >
        <FaTrash />
      </button>
    </div>
    <span className="text-xs inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 mt-2">
      {data.courseCategories}
    </span>
    <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
      <div className="flex items-center">
        <img
          src="https://i.pravatar.cc/24"
          alt="avatar"
          className="w-5 h-5 rounded-full mr-2"
        />
        Unknown
      </div>
      <div>
        <span className="ml-2 text-yellow-500">★ 0</span>
        <span className="ml-1">(0 Reviews)</span>
      </div>
    </div>
    <h2 className="text-md font-semibold mt-2">{data.courseTitle}</h2>
    <div className="py-2">
      <p className="text-[14px] text-red-600">
        ₹ {data.discountPrice}{" "}
        <span className="text-[12px] text-black line-through pl-2">
          ₹ {data.regularPrice}
        </span>
      </p>
    </div>
    <div className="flex gap-6 text-sm text-gray-600 mt-2">
      <span>📘 Lessons </span>
      <span>⏱ Duration</span>
    </div>
  </div>
);

// Main Component
const App = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [coursesData, setCoursesData] = useState([]);
  const navigate = useNavigate();

  // Fetch Courses on Load
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/course/getCourse");
        if (res.data && Array.isArray(res.data.courses)) {
          setCoursesData(res.data.courses);
        } else {
          setCoursesData([]);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        toast.error("Failed to load courses");
        setCoursesData([]);
      }
    };

    fetchCourses();
  }, []);

  // Delete Course
  const handleDeleteCourse = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/course/delete/${id}`);
      if (res.data.success) {
        toast.success("Course deleted successfully");
        setCoursesData((prev) => prev.filter((course) => course._id !== id));
      } else {
        toast.error(res.data.message || "Failed to delete course");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("Something went wrong while deleting");
    }
  };

  // Navigate to Add Course Form
  const handleCreateCourse = () => {
    navigate("/courseInfoForm");
  };

  // Render Based on Tab
  const renderContent = () => {
    switch (activeTab) {
      case "published":
        return (
          <div className="flex flex-wrap gap-4 mt-6">
            {coursesData.map((course, i) => (
              <CourseCard
                key={i}
                data={course}
                handleDelete={handleDeleteCourse}
              />
            ))}
          </div>
        );
      case "pending":
        return <div className="mt-6 text-gray-600"><p>Pending</p></div>;
      case "draft":
        return <p>Draft</p>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Enroll Courses</h1>
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex space-x-6">
          <TabButton
            label="Published"
            active={activeTab === "published"}
            onClick={() => setActiveTab("published")}
          />
          <TabButton
            label="Pending"
            active={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
          />
          <TabButton
            label="Draft"
            active={activeTab === "draft"}
            onClick={() => setActiveTab("draft")}
          />
        </div>
        <button
          onClick={handleCreateCourse}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Course
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default App;
