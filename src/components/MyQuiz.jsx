import React from "react";

const quizData = [
  {
    date: "March 26, 2025",
    course: "Speaking Korean for Beginners",
    student: "Mice Jerry",
    totalQuestions: 50,
    status: "PASSED",
  },
  {
    date: "April 15, 2025",
    course: "Speaking Korean for Beginners",
    student: "Mice Jerry",
    totalQuestions: 100,
    status: "FAILED",
  },
  {
    date: "March 26, 2025",
    course: "Speaking Korean for Beginners",
    student: "Mice Jerry",
    totalQuestions: 50,
    status: "PASSED",
  },
  {
    date: "April 15, 2025",
    course: "Speaking Korean for Beginners",
    student: "Mice Jerry",
    totalQuestions: 100,
    status: "FAILED",
  },
  {
    date: "March 26, 2025",
    course: "Speaking Korean for Beginners",
    student: "Mice Jerry",
    totalQuestions: 50,
    status: "PASSED",
  },
  {
    date: "April 15, 2025",
    course: "Speaking Korean for Beginners",
    student: "Mice Jerry",
    totalQuestions: 100,
    status: "FAILED",
  },
];

const MyQuiz = () => {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Quiz</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <div className="min-w-[600px]">
          <div className="flex font-medium bg-blue-100 p-2 rounded-t-md text-sm sm:text-base">
            <div className="w-1/2 px-2">Quiz Name</div>
            <div className="w-1/4 px-2">Total Questions</div>
            <div className="w-1/4 px-2">Status</div>
          </div>

          {quizData.map((quiz, index) => (
            <div
              key={index}
              className={`flex p-2 border-b text-sm sm:text-base ${
                index % 2 === 1 ? "bg-blue-50" : ""
              }`}
            >
              <div className="w-1/2 px-2">
                <p className="font-medium">{quiz.date}</p>
                <p>Course: {quiz.course}</p>
                <p>Student: {quiz.student}</p>
              </div>
              <div className="w-1/4 px-2 flex items-center">
                {quiz.totalQuestions} Questions
              </div>
              <div
                className={`w-1/4 px-2 font-semibold flex items-center ${
                  quiz.status === "PASSED" ? "text-green-600" : "text-red-600"
                }`}
              >
                {quiz.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyQuiz;
