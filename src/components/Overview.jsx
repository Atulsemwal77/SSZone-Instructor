import React from "react";
import img1 from "../assets/img.jpg";

import { FaBook, FaUserGraduate, FaMoneyBillWave } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const feedbacks = [
  { course: "JavaScript", enrolled: "1,200", rating: 4.1 },
  { course: "PHP", enrolled: "1,500", rating: 3.9 },
  { course: "Graphics Designer", enrolled: "2,500", rating: 4.7 },
  { course: "Data Science", enrolled: "2,290", rating: 4.5 },
];

const statsData = [
  {
    id: 1,
    icon: <FaBook className="text-white text-2xl" />,
    value: "27",
    label: "Total Courses",
  },
  {
    id: 2,
    icon: <FaUserGraduate className="text-white text-2xl" />,
    value: "08",
    label: "Active Courses",
  },
  {
    id: 3,
    icon: <FaMoneyBillWave className="text-white text-2xl" />,
    value: "12",
    label: "Completed Courses",
  },
  {
    id: 4,
    icon: <FaMoneyBillWave className="text-white text-2xl" />,
    value: "12",
    label: "Total Course",
  },
  {
    id: 5,
    icon: <FaUserGraduate className="text-white text-2xl" />,
    value: "12",
    label: "Total Students",
  },
  {
    id: 6,
    icon: <FaMoneyBillWave className="text-white text-2xl" />,
    value: "12",
    label: "Total Earning",
  },
];


const Overview = () => {
  return (
    <>
    

      <p className="font-semibold text-lg mb-2">Summary</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6 ">
      {statsData.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded shadow flex items-center space-x-4 border"
        >
          <div className="border w-10 h-10 rounded-full flex items-center justify-center bg-[#296AD2]">
            {item.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold">{item.value}</h3>
            <p className="text-gray-500 text-sm">{item.label}</p>
          </div>
        </div>
      ))}
    </div>

      

<div className="p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Feedbacks</h2>

      <table className="min-w-full table-auto bg-white rounded-md shadow">
        <thead>
          <tr className="bg-blue-100 text-left text-sm font-medium text-gray-700">
            <th className="px-4 py-2">Course Name</th>
            <th className="px-4 py-2">Enrolled</th>
            <th className="px-4 py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}
            >
              <td className="px-4 py-2">{item.course}</td>
              <td className="px-4 py-2">{item.enrolled}</td>
              <td className="px-4 py-2 flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                {item.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
};

export default Overview;
