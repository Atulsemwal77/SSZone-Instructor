import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showPopup, setShowPopup] = useState("");

  // Form states
  const [quizQuestion, setQuizQuestion] = useState("");
  const [questionType, setQuestionType] = useState("true-false");
  const [quizAnswer, setQuizAnswer] = useState("");
  const [charLimit, setCharLimit] = useState("");
  const [feedbackMode, setFeedbackMode] = useState("default");
  const [maxAttempts, setMaxAttempts] = useState("");

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

  const handleUploadQuiz = async () => {
    if (!quizQuestion || !quizAnswer || !questionType || !feedbackMode) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        question: quizQuestion,
        type: questionType,
        answer: quizAnswer,
        charLimit,
        feedbackMode,
        maxAttempts,
      };

      await axios.post("http://localhost:4000/api/quiz", payload);
      toast.success("Quiz uploaded successfully!");
      fetchQuizzes();
      setShowPopup(""); // Close modal

      // Reset form
      setQuizQuestion("");
      setQuestionType("true-false");
      setQuizAnswer("");
      setCharLimit("");
      setFeedbackMode("default");
      setMaxAttempts("");
    } catch (error) {
      console.error("Failed to upload quiz:", error);
      toast.error("Failed to upload quiz.");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Quiz</h2>
          <button
            onClick={() => setShowPopup("quiz")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Quiz
          </button>
        </div>

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
                  <span className="ml-auto">Action</span>
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
                          className="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300"
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

      {/* Quiz Popup */}
      {showPopup === "quiz" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add Quiz</h3>
            <div
              className="space-y-4 text-sm"
              style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "8px" }}
            >
              <div>
                <label className="block mb-1 font-medium">Write Your Question</label>
                <input
                  type="text"
                  placeholder="Write question..."
                  value={quizQuestion}
                  onChange={(e) => setQuizQuestion(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Select Your Question Type</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Write Your Answer</label>
                <input
                  type="text"
                  placeholder="Write answer..."
                  value={quizAnswer}
                  onChange={(e) => setQuizAnswer(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Short Answer Characters Limit</label>
                <input
                  type="number"
                  placeholder="200"
                  value={charLimit}
                  onChange={(e) => setCharLimit(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Quiz Feedback Mode</label>
                <select
                  value={feedbackMode}
                  onChange={(e) => setFeedbackMode(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="default">Default - Answer Shown After Quiz Is Finished.</option>
                  <option value="reveal">Reveal Mode - Show Result After the Attempt.</option>
                  <option value="retry">Retry Mode - Reattempt Quiz Any Number Of Times.</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Max Question Allowed To Answer</label>
                <input
                  type="number"
                  placeholder="01"
                  value={maxAttempts}
                  onChange={(e) => setMaxAttempts(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 border rounded text-sm"
                  onClick={() => setShowPopup("")}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                  onClick={handleUploadQuiz}
                >
                  Upload Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
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
