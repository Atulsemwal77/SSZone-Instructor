import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Pencil, Trash2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

const CourseIntroVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [showModule, setShowModule] = useState(true);
  // const [showPopup, setShowPopup] = useState('');
  const [moduleName, setModuleName] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [modules, setModules] = useState([]);

  // Lesson state
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonImage, setLessonImage] = useState(null);
  const [lessonVideoSource, setLessonVideoSource] = useState("");
  const [lessonHour, setLessonHour] = useState("");
  const [lessonMinute, setLessonMinute] = useState("");
  const [lessonSecond, setLessonSecond] = useState("");


  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizAnswer, setQuizAnswer] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [charLimit, setCharLimit] = useState(200);
  const [feedbackMode, setFeedbackMode] = useState("default");
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [quizList, setQuizList] = React.useState([]);

  // Assignment state
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [timeLimitHours, setTimeLimitHours] = useState(4);
  const [totalPoints, setTotalPoints] = useState(0);
  const [minPassPoints, setMinPassPoints] = useState(200);
  const [allowUploadFiles, setAllowUploadFiles] = useState(4);
  const [maxFileSizeMB, setMaxFileSizeMB] = useState(2);
  const [lessons, setLessons] = useState([]);
  const [assignments, setAssignments] = React.useState([]);
console.log('lessons',lessons);
  console.log('assignments',assignments);


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/course/courseIntroVideo",
        { videoUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Video URL added successfully!");
      setVideoUrl("");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  const handleAddModule = async () => {
    if (!moduleTitle) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/course/module",
        {
          title: moduleTitle,
        }
      );

      if (response.data.success) {
        setModules([...modules, response.data.module]);
        setModuleTitle("");
        setShowPopup(false);
      }
    } catch (error) {
      console.error("Error adding module", error);
    }
  };


const handleUploadModule = async () => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/modules/module",
      {
        title: moduleName,
        subTopic: subTopic,
      }
    );
    if (response.data.success) {
      toast.success("Module uploaded successfully!");
      setModules([...modules, response.data.module]);
      setModuleName("");
      setSubTopic("");
      setShowPopup("");
    } else {
      toast.error("Failed to upload module.");
    }
  } catch (error) {
    console.error("Error uploading module", error);
    toast.error("Error uploading module.");
  }
};

 

  const handleUploadLesson = async () => {
  const lessonData = {
    lessonTitle,
    lessonContent,
    lessonImage: lessonImage.name, // Ideally this should be uploaded to Cloudinary or server
    lessonVideoSource,
    lessonHour,
    lessonMinute,
    lessonSecond
  };

  try {
    const response = await fetch("http://localhost:4000/api/lesson/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lessonData)
    });

    const result = await response.json();
    if (result.success) {
      alert("Lesson uploaded!");
      setShowPopup("");
      // optionally fetch data again
    } else {
      alert("Failed to upload lesson");
    }
  } catch (error) {
    console.error("Error uploading lesson:", error);
  }
};


useEffect(() => {
  const fetchLessons = async () => {
    const res = await fetch("http://localhost:4000/api/lesson/all");
    const data = await res.json();
    if (data.success) {
      setLessons(data.data);
    }
  };
  fetchLessons();
}, []);


const handleDeleteLesson = async (lessonId) => {
  try {
    const res = await fetch(`http://localhost:4000/api/lesson/delete/${lessonId}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (result.success) {
      alert("Lesson deleted!");
      // Refresh the lesson list after delete
      setLessons((prev) => prev.filter((lesson) => lesson._id !== lessonId));
    }  else {
      toast.error("Failed to delete lesson");
    }
  } catch (error) {
    console.error("Error deleting lesson:", error);
    toast.error("An error occurred");
  }
};



const fetchQuizData = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/quiz');
    const data = await response.json();
    if (data.success) {
      setQuizList(data.quizzes);
    }
  } catch (error) {
    console.error('Failed to fetch quizzes', error);
  }
};

React.useEffect(() => {
  fetchQuizData();
}, []);

const handleUploadQuiz = async () => {
  const payload = {
    question: quizQuestion,
    type: questionType,
    answer: quizAnswer,
    charLimit: charLimit,
    feedbackMode: feedbackMode,
    maxAttempts: maxAttempts,
  };

  try {
    const response = await fetch('http://localhost:4000/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.success) {
      alert('Quiz added successfully');
      setShowPopup('');
      fetchQuizData(); // refetch to update list
    } else {
      alert('Failed to add quiz');
    }
  } catch (error) {
    console.error(error);
    alert('Error uploading quiz');
  }
};


  const fetchAssignments = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/assignment');
    const data = await res.json();
    if (data.success) {
      setAssignments(data.assignments);
    }
  } catch (error) {
    console.error('Error fetching assignments:', error);
  }
};

React.useEffect(() => {
  fetchAssignments();
}, []);

const handleUploadAssignment = async () => {
  // Prepare form data for file upload
  const formData = new FormData();
  formData.append('title', assignmentTitle);
  formData.append('description', assignmentDescription);
  formData.append('timeLimitHours', timeLimitHours);
  formData.append('totalPoints', totalPoints);
  formData.append('minPassPoints', minPassPoints);
  formData.append('allowUploadFiles', allowUploadFiles);
  formData.append('maxFileSizeMB', maxFileSizeMB);

  if (assignmentFile) {
    formData.append('attachment', assignmentFile);
  }

  try {
    const response = await fetch('http://localhost:4000/api/assignment', {
      method: 'POST',
      body: formData, // use FormData for file upload
    });

    const data = await response.json();
    if (data.success) {
      alert('Assignment added successfully');
      setShowPopup('');
      fetchAssignments();
      // Clear form fields if needed here
    } else {
      alert('Failed to add assignment');
    }
  } catch (error) {
    console.error(error);
    alert('Error uploading assignment');
  }
};

  const popupModal = () => (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setShowPopup("")}
        >
          <X />
        </button>

        {showPopup === "module" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Add New Module</h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Module name"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
              />
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Sub-topic"
                value={subTopic}
                onChange={(e) => setSubTopic(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 border rounded text-sm"
                  onClick={() => setShowPopup("")}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                  onClick={handleUploadModule}
                >
                  Upload Module
                </button>
              </div>
            </div>
          </>
        )}

        {/* lesson popup */}

        {showPopup === "lesson" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Lesson</h3>
            <div className="space-y-4">
              {/* Lesson Name */}
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Lesson Name"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />

              {/* Lesson Summary */}
              <textarea
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Lesson Summary"
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
              />

              {/* Feature Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Feature Image
                </label>
                <div className="w-full border rounded px-3 py-2 text-sm flex items-center">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.webp"
                    onChange={(e) => setLessonImage(e.target.files[0])}
                    className="text-sm w-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Size: 700x430 pixels, File Support: JPG, JPEG, PNG, GIF, WEBP
                </p>
              </div>

              {/* Video Source */}
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Video Source"
                value={lessonVideoSource}
                onChange={(e) => setLessonVideoSource(e.target.value)}
              />

              {/* Video Playback Time */}
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Hour"
                  value={lessonHour}
                  onChange={(e) => setLessonHour(e.target.value)}
                  min="0"
                />
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Minute"
                  value={lessonMinute}
                  onChange={(e) => setLessonMinute(e.target.value)}
                  min="0"
                />
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="Second"
                  value={lessonSecond}
                  onChange={(e) => setLessonSecond(e.target.value)}
                  min="0"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-4 py-2 border rounded text-sm"
                  onClick={() => setShowPopup("")}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                  onClick={handleUploadLesson}
                >
                  Upload Lesson
                </button>
              </div>
            </div>
          </>
        )}

        {/* quiz popup */}
        {showPopup === "quiz" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Quiz</h3>
            <div
              className="space-y-4 text-sm"
              style={{
                maxHeight: "400px", // Set max height you want for popup content
                overflowY: "auto", // Enable vertical scrolling when content is taller than maxHeight
                paddingRight: "8px", // optional, to avoid content hiding under scrollbar
              }}
            >
              <div className="space-y-4 text-sm">
                {/* Quiz Question */}
                <div>
                  <label className="block mb-1 font-medium">
                    Write Your Question
                  </label>
                  <input
                    type="text"
                    placeholder="Write question..."
                    value={quizQuestion}
                    onChange={(e) => setQuizQuestion(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Question Type */}
                <div>
                  <label className="block mb-1 font-medium">
                    Select Your Question Type
                  </label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                    {/* Add more types if needed */}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Helper Text</p>
                </div>

                {/* Answer */}
                <div>
                  <label className="block mb-1 font-medium">
                    Write Your Answer
                  </label>
                  <input
                    type="text"
                    placeholder="Write answer..."
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Short Answer Character Limit */}
                <div>
                  <label className="block mb-1 font-medium">
                    Short Answer Characters Limit
                  </label>
                  <input
                    type="number"
                    placeholder="200"
                    value={charLimit}
                    onChange={(e) => setCharLimit(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Quiz Feedback Mode */}
                <div>
                  <label className="block mb-1 font-medium">
                    Quiz Feedback Mode
                  </label>
                  <select
                    value={feedbackMode}
                    onChange={(e) => setFeedbackMode(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="default">
                      Default - Answer Shown After Quiz Is Finished.
                    </option>
                    <option value="reveal">
                      Reveal Mode - Show Result After the Attempt.
                    </option>
                    <option value="retry">
                      Retry Mode - Reattempt Quiz Any Number Of Times.
                    </option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Max Question Attempts */}
                <div>
                  <label className="block mb-1 font-medium">
                    Max Question Allowed To Answer
                  </label>
                  <input
                    type="number"
                    placeholder="01"
                    value={maxAttempts}
                    onChange={(e) => setMaxAttempts(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Action Buttons */}
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
          </>
        )}

        {/* assignment popup */}
        {showPopup === "assignment" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Assignment</h3>
            <div
              className="space-y-4 text-sm"
              style={{
                maxHeight: "400px", // Set max height you want for popup content
                overflowY: "auto", // Enable vertical scrolling when content is taller than maxHeight
                paddingRight: "8px", // optional, to avoid content hiding under scrollbar
              }}
            >
              <div className="space-y-4 text-sm">
                {/* Assignment Title */}
                <div>
                  <label className="block mb-1 font-medium">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    placeholder="Write assignment title..."
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Summary */}
                <div>
                  <label className="block mb-1 font-medium">Summary</label>
                  <textarea
                    placeholder="write summary ..."
                    value={assignmentDescription}
                    onChange={(e) => {
                      if (e.target.value.length <= 500)
                        setAssignmentDescription(e.target.value);
                    }}
                    className="w-full border rounded px-3 py-2"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum 500 characters
                    <br />
                    {assignmentDescription.length} / 500
                  </p>
                </div>

                {/* Attachments */}
                <div>
                  <label className="block mb-1 font-medium">Attachments</label>
                  <label className="block mb-1 text-xs text-gray-600">
                    Upload Attachment
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setAssignmentFile(e.target.files[0])}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Time Limit */}
                <div>
                  <label className="block mb-1 font-medium">Time Limit</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      value={timeLimitHours}
                      onChange={(e) => setTimeLimitHours(e.target.value)}
                      className="w-16 border rounded px-3 py-2 text-sm"
                      placeholder="04"
                    />
                    <span className="text-sm pt-2">hour(s)</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Video Source Weeks
                  </p>
                  <p className="text-xs text-gray-500 mt-1">helper text</p>
                </div>

                {/* Total Points */}
                <div>
                  <label className="block mb-1 font-medium">Total Points</label>
                  <input
                    type="number"
                    min={0}
                    value={totalPoints}
                    onChange={(e) => setTotalPoints(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Minimum Pass Points */}
                <div>
                  <label className="block mb-1 font-medium">
                    Minimum Pass Points
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={minPassPoints}
                    onChange={(e) => setMinPassPoints(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="200"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Allow To Upload Files */}
                <div>
                  <label className="block mb-1 font-medium">
                    Allow To Upload Files
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={allowUploadFiles}
                    onChange={(e) => setAllowUploadFiles(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="4"
                  />
                  <p className="text-xs text-gray-500 mt-1">Assistive Text</p>
                </div>

                {/* Maximum File Size Limit */}
                <div>
                  <label className="block mb-1 font-medium">
                    Maximum File Size Limit (MB)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={maxFileSizeMB}
                    onChange={(e) => setMaxFileSizeMB(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Define maximum file size attachment in MB
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="px-4 py-2 border rounded text-sm"
                    onClick={() => setShowPopup("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                    onClick={handleUploadAssignment}
                  >
                    Upload Assignment
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6 max-w-4xl w-full mx-auto relative">
      {/* Intro Video Upload */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowIntro(!showIntro)}
        >
          <h2 className="text-lg font-semibold">Course Intro Video</h2>
          {showIntro ? <ChevronUp /> : <ChevronDown />}
        </div>
        {showIntro && (
          <form onSubmit={handleOnSubmit}>
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium">
                Add Your Video URL
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?"
                className="w-full rounded px-3 py-2 text-sm border"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Example: https://www.youtube.com/watch?v=yourvideoid
              </p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto shadow">
                Upload
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Modules 123 */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
  <div
    className="flex justify-between items-center cursor-pointer"
    onClick={() => setShowModule(!showModule)}
  >
    <h2 className="text-lg font-semibold">Modules</h2>
    {showModule ? <ChevronUp /> : <ChevronDown />}
  </div>

  {showModule && (
    <div className="mt-4 space-y-4">

      {/* Modules Mapping (Optional if using) */}
      {modules.map((mod, index) => (
        <div
          key={index}
          className="flex justify-between items-center rounded px-3 py-2 bg-gray-50 hover:bg-gray-100 shadow"
        >
          <span className="text-sm font-medium break-words max-w-full">
            {mod.title}
          </span>
          <div className="flex items-center space-x-2">
            <Pencil className="w-4 h-4 cursor-pointer" />
            <Trash2 className="w-4 h-4 cursor-pointer" />
          </div>
        </div>
      ))}

{/* Lessons List */}
{lessons.map((lesson, index) => (
  <div
    key={index}
    className="flex flex-col border border-gray-200 rounded p-3 bg-white shadow hover:bg-gray-50"
  >
    <div className="flex justify-between items-start">
      <h3 className="font-semibold text-sm">{lesson.lessonTitle}</h3>
      <button
        onClick={() => handleDeleteLesson(lesson._id)}
        className="text-red-500 text-xs hover:underline"
      >
        Delete
      </button>
    </div>
    <p className="text-xs text-gray-600 mt-1">{lesson.lessonContent}</p>
    <div className="text-xs text-gray-500 mt-1">
      Duration: {lesson.lessonHour}h {lesson.lessonMinute}m {lesson.lessonSecond}s
    </div>
    {lesson.lessonImage && (
      <img
        src={`http://localhost:4000/uploads/${lesson.lessonImage}`}
        alt="Lesson"
        className="mt-2 w-32 h-20 object-cover rounded"
      />
    )}
  </div>
))}



      {/* Assignment List */}
      {assignments.map((assignment, index) => (
        <div
          key={index}
          className="flex flex-col border border-gray-200 rounded p-3 bg-gray-50 hover:bg-gray-100"
        >
          <h3 className="font-medium text-sm">{assignment.title}</h3>
          <p className="text-xs text-gray-600">{assignment.description}</p>
          <div className="text-xs text-gray-500 mt-1">
            Time Limit: {assignment.timeLimitHours} hrs |
            Total Points: {assignment.totalPoints} |
            Pass Marks: {assignment.minPassPoints}
          </div>
          {assignment.attachment && (
            <a
              href={assignment.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs underline mt-1"
            >
              View Attachment
            </a>
          )}
        </div>
      ))}

      {/* Add Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShowPopup("lesson")}
          className="px-3 py-1 border border-black rounded text-sm hover:bg-gray-100 shadow"
        >
          Add Lesson
        </button>
        <button
          onClick={() => setShowPopup("quiz")}
          className="px-3 py-1 border border-black rounded text-sm hover:bg-gray-100 shadow"
        >
          Add Quiz
        </button>
        <button
          onClick={() => setShowPopup("assignment")}
          className="px-3 py-1 border border-black rounded text-sm hover:bg-gray-100 shadow"
        >
          Add Assignment
        </button>
      </div>
    </div>
  )}
</div>


      {/* Static Placeholder for Next Module */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex justify-between items-center cursor-pointer">
          <h2 className="text-lg font-semibold">
            Variables and the Magic of Memory
          </h2>
          <ChevronDown />
        </div>
      </div>

      {/* Add New Module Button */}
      <button
        className="mt-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto shadow"
        onClick={() => setShowPopup("module")}
      >
        <Plus className="w-4 h-4" />
        <span> Add New Module</span>
      </button>

      {/* Show Popup Modal */}
      {showPopup && popupModal()}
    </div>
  );
};

export default CourseIntroVideo;