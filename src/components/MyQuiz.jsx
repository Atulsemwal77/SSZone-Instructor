import React, { useEffect, useState } from "react";
import axios from "axios";

const MyQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // To track quiz being deleted

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/quiz");
      setQuizData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (quizId) => {
  if (!window.confirm("Are you sure you want to delete this quiz?")) return;

  try {
    setDeletingId(quizId);
    await axios.delete(`http://localhost:4000/api/quiz/${quizId}`);
    setQuizData((prevData) => prevData.filter((quiz) => quiz._id !== quizId));
    toast.success("Quiz deleted successfully!");
  } catch (error) {
    console.error("Failed to delete quiz:", error);
    toast.error("Failed to delete quiz. Please try again.");
  } finally {
    setDeletingId(null);
  }
};

  

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Quiz</h2>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <div className="min-w-[600px]">
            <div className="flex font-medium bg-blue-100 p-2 rounded-t-md text-sm sm:text-base">
              <div className="w-1/2 px-2">Quiz Name</div>
              <div className="w-1/4 px-2">Total Characters (Limit)</div>
              <div className="w-1/4 px-2 flex justify-between items-center">
                <span>Feedback Mode</span>
                <span>Action</span> {/* Header for delete button */}
              </div>
            </div>

            {quizData.length > 0 ? (
              <ul className="space-y-2">
                {quizData.map((quiz, index) => (
                  <li
                    key={quiz._id || index}
                    className="border p-4 rounded bg-gray-50 flex justify-between items-center"
                  >
                    <div className="w-1/2">
                      <p><strong>Question:</strong> {quiz.question}</p>
                      <p><strong>Type:</strong> {quiz.type}</p>
                      <p><strong>Answer:</strong> {quiz.answer}</p>
                    </div>
                    <div className="w-1/4">
                      <p><strong>Char Limit:</strong> {quiz.charLimit}</p>
                    </div>
                    <div className="w-1/4 flex justify-between items-center">
                      <p>{quiz.feedbackMode}</p>
                      <button
  onClick={() => handleDelete(quiz._id)}
  disabled={deletingId === quiz._id}
  className={`ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300`}
>
  {deletingId === quiz._id ? "Deleting..." : "Delete"}
</button>

                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4">No quizzes found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuiz;


// import React from "react";

// const quizData = [
//   {
//     date: "March 26, 2025",
//     course: "Speaking Korean for Beginners",
//     student: "Mice Jerry",
//     totalQuestions: 50,
//     status: "PASSED",
//   },
//   {
//     date: "April 15, 2025",
//     course: "Speaking Korean for Beginners",
//     student: "Mice Jerry",
//     totalQuestions: 100,
//     status: "FAILED",
//   },
//   {
//     date: "March 26, 2025",
//     course: "Speaking Korean for Beginners",
//     student: "Mice Jerry",
//     totalQuestions: 50,
//     status: "PASSED",
//   },
//   {
//     date: "April 15, 2025",
//     course: "Speaking Korean for Beginners",
//     student: "Mice Jerry",
//     totalQuestions: 100,
//     status: "FAILED",
//   },
//   {
//     date: "March 26, 2025",
//     course: "Speaking Korean for Beginners",
//     student: "Mice Jerry",
//     totalQuestions: 50,
//     status: "PASSED",
//   },
//   {
//     date: "April 15, 2025",
//     course: "Speaking Korean for Beginners",
//     student: "Mice Jerry",
//     totalQuestions: 100,
//     status: "FAILED",
//   },
// ];

// const MyQuiz = () => {
//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">My Quiz</h2>

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <div className="min-w-[600px]">
//           <div className="flex font-medium bg-blue-100 p-2 rounded-t-md text-sm sm:text-base">
//             <div className="w-1/2 px-2">Quiz Name</div>
//             <div className="w-1/4 px-2">Total Questions</div>
//             <div className="w-1/4 px-2">Status</div>
//           </div>

//           {quizData.map((quiz, index) => (
//             <div
//               key={index}
//               className={`flex p-2 border-b text-sm sm:text-base ${
//                 index % 2 === 1 ? "bg-blue-50" : ""
//               }`}
//             >
//               <div className="w-1/2 px-2">
//                 <p className="font-medium">{quiz.date}</p>
//                 <p>Course: {quiz.course}</p>
//                 <p>Student: {quiz.student}</p>
//               </div>
//               <div className="w-1/4 px-2 flex items-center">
//                 {quiz.totalQuestions} Questions
//               </div>
//               <div
//                 className={`w-1/4 px-2 font-semibold flex items-center ${
//                   quiz.status === "PASSED" ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {quiz.status}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyQuiz;

