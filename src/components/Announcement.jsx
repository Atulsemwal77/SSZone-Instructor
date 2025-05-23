import React from "react";

const announcements = [
  {
    date: "March 26,2025",
    time: "10.00am",
    title: "Midterm Exam Schedule Released",
    course: "Mathematics 201",
  },
  {
    date: "March 27,2025",
    time: "2.30pm",
    title: "Guest Lecture on AI",
    course: "Computer Science 310",
  },
  {
    date: "March 28,2025",
    time: "9.00am",
    title: "Project Submission Deadline",
    course: "Software Engineering 202",
  },
  {
    date: "March 29,2025",
    time: "11.15am",
    title: "Library Orientation Session",
    course: "Library Science 101",
  },
  {
    date: "March 30,2025",
    time: "1.00pm",
    title: "Field Trip to Tech Park",
    course: "Information Systems 220",
  },
  {
    date: "March 31,2025",
    time: "4.45pm",
    title: "Quiz on Chapter 5",
    course: "Physics 102",
  },
  {
    date: "April 1,2025",
    time: "3.00pm",
    title: "Internship Orientation",
    course: "Career Development",
  },
  {
    date: "April 2,2025",
    time: "10.30am",
    title: "New Lab Timings",
    course: "Chemistry 103",
  },
  {
    date: "April 3,2025",
    time: "12.00pm",
    title: "Course Feedback Reminder",
    course: "English Literature 104",
  },
  {
    date: "April 4,2025",
    time: "5.15pm",
    title: "Sports Day Schedule",
    course: "Physical Education",
  },
];

const Announcement = () => {
  return (
    <div className=" p-6">
      <h1 className="text-2xl font-semibold mb-4">Announcement</h1>

      <div className="bg-blue-100 p-6 rounded-lg mb-6 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">Notify your all students.</p>
          <p className="text-sm text-gray-700">Create Announcement</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
          Add New Announcement
        </button>
      </div>

      <div className="bg-blue-50 rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 font-semibold text-gray-700 border-b p-4">
          <div>Date</div>
          <div>Announcements</div>
          <div>Status</div>
        </div>

        {announcements.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 items-start text-sm text-gray-800 border-b px-4 py-3"
          >
            <div>
              <p>{item.date}</p>
              <p className="text-gray-500 text-xs">{item.time}</p>
            </div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-500 text-xs">Course: {item.course}</p>
            </div>
            <div>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
