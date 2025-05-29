
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
   const validatePhone = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);

  const tabs = ["profile", "password", "social"];

  const isActive = (tab) =>
    activeTab === tab
      ? "border-b-2 border-blue-500 text-black font-medium"
      : "text-gray-500 hover:text-black";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skill, setSkill] = useState("");
  const [displayNamePubliclyAs, setDisplayNamePubliclyAs] = useState("");
  const [bio, setBio] = useState("");

const profileSubmit = async (e) => {
  e.preventDefault();

  if (
    !firstName ||
    !lastName ||
    !userName ||
    !phoneNumber ||
    !skill ||
    !displayNamePubliclyAs ||
    !bio
  ) {
    return toast.error("Fill all fields.");
  }

  if (!validatePhone(phoneNumber)) {
      return toast.error("Please enter a valid 10-digit phone number.");
    }

  const formData = {
    firstName,
    lastName,
    userName,
    phoneNumber,
    skill,
    displayNamePubliclyAs,
    bio,
  };

  try {
    await axios.post("http://localhost:3999/api/setting/postsetting", formData);
    toast.success("Settings updated successfully");

    // Clear form fields
    setFirstName("");
    setLastName("");
    setUserName("");
    setPhoneNumber("");
    setSkill("");
    setDisplayNamePubliclyAs("");
    setBio("");
  } catch (error) {
    console.error("Profile update error:", error);
    toast.error("Failed to update settings");
  }
};

  return (
    <div className="mx-auto p-6 space-y-6 max-w-6xl">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="grid grid-cols-3 gap-2 border-b mb-6 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 capitalize cursor-pointer text-lg font-semibold ${isActive(tab)}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "profile"
              ? "Profile"
              : tab === "password"
              ? "Password"
              : "Social Links"}
          </button>
        ))}
      </div>

      {/* Profile Section */}
      {activeTab === "profile" && (
        <form className="space-y-6" >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="font-medium mb-1">
              <label className="mb-1">First Name</label>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="font-medium mb-1">
              <label className="mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Don"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="font-medium mb-1">
              <label className="mb-1">Username</label>
              <input
                type="text"
                placeholder="Johndon01"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="font-medium mb-1">
              <label className="mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="123-456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="font-medium mb-1">
              <label className="mb-1">Skill/Occupation</label>
              <input
                type="text"
                placeholder="Developer"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="font-medium mb-1">
              <label className="mb-1">Display Name Publicly As</label>
              <input
                type="text"
                placeholder="John Developer"
                value={displayNamePubliclyAs}
                onChange={(e) => setDisplayNamePubliclyAs(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="font-medium mb-1">
            <label className="mb-1">Bio</label>
            <textarea
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 resize-none"
            />
          </div>

          <button
            type="submit"
            onClick= {profileSubmit}
            disabled = {!firstName || !lastName || !userName || !phoneNumber || !skill || !displayNamePubliclyAs || !bio}

            className={`px-6 py-2 text-white rounded-md mt-5 ${!firstName || !lastName || !userName || !phoneNumber || !skill || !displayNamePubliclyAs || !bio 
              ? "bg-gray-400 cursor-not-allowed" :
              "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Update Information
          </button>
        </form>
      )}

      {/* Password Section & Social Links Sections remain unchanged */}
    </div>
  );
};

export default Settings;
