import React from "react";

const Profile = () => {
  return (
    <div className="p-6 ">
      <h2 className="text-xl font-semibold mb-6">Profile</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-48 font-medium text-gray-600">Registration Date</div>
          <div className="text-gray-800">20, January 2024 9:00 PM</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-48 font-medium text-gray-600">First Name</div>
          <div className="text-gray-800">Michle</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-48 font-medium text-gray-600">Last Name</div>
          <div className="text-gray-800">Obema</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-48 font-medium text-gray-600">Username</div>
          <div className="text-gray-800">obema007</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-48 font-medium text-gray-600">Email</div>
          <div className="text-gray-800">obema@example.com</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-48 font-medium text-gray-600">Phone Number</div>
          <div className="text-gray-800">+55 669 4456 25987</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-48 font-medium text-gray-600">Expert</div>
          <div className="text-gray-800">Graphics Design</div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-x-20">
          <div className="w-48 font-medium text-gray-600 ">Biography</div>
          <div className="text-gray-800 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            veniam, delectus accusamus nesciunt laborum repellat laboriosam,
            deserunt possimus itaque iusto perferendis voluptatum quaerat
            cupiditate vitae. Esse aut illum perferendis nulla, corporis impedit
            quasi alias est!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
