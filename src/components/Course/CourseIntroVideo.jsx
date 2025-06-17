import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Pencil, Trash2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

const CourseIntroVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [showModule, setShowModule] = useState(true);
  const [showPopup, setShowPopup] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModuleId, setSelectedModuleId] = useState("");

  // Lesson state
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonImage, setLessonImage] = useState(null);
  const [lessonVideoSource, setLessonVideoSource] = useState("");
  const [lessonHour, setLessonHour] = useState("");
  const [lessonMinute, setLessonMinute] = useState("");
  const [lessonSecond, setLessonSecond] = useState("");

  const fetchModules = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/modules`);
      if (response.data.success) {
        setModules(response.data.modules);
      }
    } catch (error) {
      toast.error("Error fetching modules");
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/course/courseIntroVideo`,
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
      toast.error("Error uploading video URL");
      console.error("Error:", err.response?.data || err.message);
    }
  };

  const handleAddModule = async () => {
    if (!moduleTitle) {
      toast.error("Module title is required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/module`,
        { title: moduleTitle }
      );

      if (response.data.success) {
        toast.success("Module added successfully!");
        setModules([...modules, response.data.module]);
        setModuleTitle("");
        setShowPopup("");
        fetchModules();
      }
    } catch (error) {
      toast.error("Error adding module");
      console.error("Error adding module", error);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/api/module/${moduleId}`
      );
      if (response.data.success) {
        toast.success("Module deleted successfully!");
        setModules(modules.filter((mod) => mod._id !== moduleId));
      }
    } catch (error) {
      toast.error("Error deleting module");
      console.error("Error deleting module", error);
    }
  };

  const handleUploadLesson = async () => {
    if (!lessonTitle || !lessonContent || !selectedModuleId) {
      toast.error("Lesson title, content, and module selection are required");
      return;
    }

    const lessonData = {
      lessonTitle,
      lessonContent,
      lessonImage: lessonImage?.name,
      lessonVideoSource,
      lessonHour: parseInt(lessonHour) || 0,
      lessonMinute: parseInt(lessonMinute) || 0,
      lessonSecond: parseInt(lessonSecond) || 0,
      moduleId: selectedModuleId
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/lesson`,
        lessonData
      );

      if (response.data.success) {
        toast.success("Lesson uploaded successfully!");
        setShowPopup("");
        setLessonTitle("");
        setLessonContent("");
        setLessonImage(null);
        setLessonVideoSource("");
        setLessonHour("");
        setLessonMinute("");
        setLessonSecond("");
        setSelectedModuleId("");
        fetchModules();
      }
    } catch (error) {
      toast.error("Error uploading lesson");
      console.error("Error uploading lesson:", error);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/api/lesson/${lessonId}`
      );

      if (response.data.success) {
        toast.success("Lesson deleted successfully!");
        fetchModules();
      }
    } catch (error) {
      toast.error("Error deleting lesson");
      console.error("Error deleting lesson:", error);
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
                placeholder="Module title"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
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
                  onClick={handleAddModule}
                >
                  Add Module
                </button>
              </div>
            </div>
          </>
        )}

        {showPopup === "lesson" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Add New Lesson</h3>
            <div className="space-y-4">
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
              >
                <option value="">Select a module</option>
                {modules.map((module) => (
                  <option key={module._id} value={module._id}>
                    {module.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Lesson Title"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />
              <textarea
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Lesson Content"
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium mb-1">Feature Image</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  onChange={(e) => setLessonImage(e.target.files[0])}
                  className="text-sm w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Size: 700x430 pixels, File Support: JPG, JPEG, PNG, GIF, WEBP
                </p>
              </div>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Video Source"
                value={lessonVideoSource}
                onChange={(e) => setLessonVideoSource(e.target.value)}
              />
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
                  Add Lesson
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6 max-w-4xl w-full mx-auto relative">
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
              <label className="block text-sm font-medium">Add Your Video URL</label>
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
            {modules.map((module) => (
              <div key={module._id} className="space-y-2">
                <div className="flex justify-between items-center rounded px-3 py-2 bg-gray-50 hover:bg-gray-100 shadow">
                  <span className="text-sm font-medium break-words max-w-full">
                    {module.title}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Pencil className="w-4 h-4 cursor-pointer" />
                    <Trash2
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleDeleteModule(module._id)}
                    />
                  </div>
                </div>
                <div className="ml-4 space-y-2">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson._id}
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
                          src={`${import.meta.env.VITE_BACKEND}/uploads/${lesson.lessonImage}`}
                          alt="Lesson"
                          className="mt-2 w-32 h-20 object-cover rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => setShowPopup("lesson")}
              className="px-3 py-1 border border-black rounded text-sm hover:bg-gray-100 shadow"
            >
              Add Lesson
            </button>
            <button
              onClick={() => setShowPopup("module")}
              className="px-3 py-1 border border-black rounded text-sm hover:bg-gray-100 shadow"
            >
              Add Module
            </button>
          </div>
        )}
      </div>

      {showPopup && popupModal()}
    </div>
  );
};

export default CourseIntroVideo;