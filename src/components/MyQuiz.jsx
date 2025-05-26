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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      setDeletingId(id);
      await axios.delete(`http://localhost:4000/api/quiz/${id}`);
      // Remove deleted quiz from state
      setQuizData((prev) => prev.filter((quiz) => quiz._id !== id));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Failed to delete quiz. Please try again.");
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
