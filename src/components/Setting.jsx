import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = ["profile", "password", "social"];

  const isActive = (tab) =>
    activeTab === tab
      ? "border-b-2 border-blue-500 text-black font-medium"
      : "text-gray-500 hover:text-black";

  return (
    <div className="mx-auto p-6 space-y-6 max-w-4xl">
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
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-sm font-medium mb-1">
              <label className="mb-1">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="text-sm font-medium mb-1">
              <label className="mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Don"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="text-sm font-medium mb-1">
              <label className="mb-1">Username</label>
              <input
                type="text"
                placeholder="Johndon01"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="text-sm font-medium mb-1">
              <label className="mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="123-456-7890"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="text-sm font-medium mb-1">
              <label className="mb-1">Skill/Occupation</label>
              <input
                type="text"
                placeholder="Developer"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="text-sm font-medium mb-1">
              <label className="mb-1">Display Name Publicly As</label>
              <input
                type="text"
                placeholder="John Developer"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="text-sm font-medium mb-1">
            <label className="mb-1">Bio</label>
            <textarea
              placeholder="Tell us about yourself"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-5"
          >
            Update Information
          </button>
        </form>
      )}

      {/* Password Section */}
      {activeTab === "password" && (
        <form className="space-y-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="***********"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="***********"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Re-Enter New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="***********"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-7"
          >
            Update Password
          </button>
        </form>
      )}

      {/* Social Links Section */}
      {activeTab === "social" && (
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Facebook</label>
              <input
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://facebook.com/"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Instagram</label>
              <input
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://instagram.com/"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Twitter</label>
              <input
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://twitter.com/"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://linkedin.com/"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Website/Portfolio</label>
              <input
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://portfolio.com/"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">GitHub</label>
              <input
                type="url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="https://github.com/"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-7"
          >
            Update Social Links
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
