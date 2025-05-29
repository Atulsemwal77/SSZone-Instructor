import React from 'react';
import img1 from "../assets/img.jpg";
import { FaArrowRight } from "react-icons/fa";
import { PiBookOpenText, PiMedalDuotone } from 'react-icons/pi';
import { useNavigate } from "react-router-dom";

const Abc = () => {

    const navigate = useNavigate();

   const handleCreateCourse = () => {
    navigate("/courseIntroVideo");
  };


  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-10 rounded-xl flex flex-wrap md:flex-nowrap justify-between items-center gap-6 mb-6">
      
      {/* Profile Section */}
      <div className="flex items-center gap-5">
        <img
          src={img1}
          alt="Profile of student"
          className="rounded-full w-20 border-4 border-white"
        />
        <div>
          <h2 className="text-xl font-semibold pb-2">Michelle Obama</h2>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <PiBookOpenText />
              <p>5 Courses Enrolled</p>
            </div>
            <div className="flex items-center gap-2">
              <PiMedalDuotone />
              <p>4 Certificates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
      onClick={handleCreateCourse}
      className="px-5 py-2 border border-white rounded-lg flex items-center gap-2 shadow hover:bg-white hover:text-purple-700 transition"
    >
      Create a New Course <FaArrowRight />
    </button>
    </div>
  );
};

export default Abc;

// import React from 'react';
// import img1 from "../assets/img.jpg";
// import { FaArrowRight } from "react-icons/fa";
// import { PiBookOpenText, PiMedalDuotone } from 'react-icons/pi';

// const Abc = () => {
//   return (
//     <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-10 rounded-xl flex flex-wrap md:flex-nowrap justify-between items-center gap-6 mb-6">
      
//       {/* Profile Section */}
//       <div className="flex items-center gap-5">
//         <img
//           src={img1}
//           alt="Profile of student"
//           className="rounded-full w-20 border-4 border-white"
//         />
//         <div>
//           <h2 className="text-xl font-semibold pb-2">Michelle Obama</h2>
          
//           <div className="flex flex-wrap gap-4 text-sm">
//             <div className="flex items-center gap-2">
//               <PiBookOpenText />
//               <p>5 Courses Enrolled</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <PiMedalDuotone />
//               <p>4 Certificates</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Button */}
//       <button className="px-5 py-2 border border-white rounded-lg flex items-center gap-2 shadow hover:bg-white hover:text-purple-700 transition">
//         Create a New Course <FaArrowRight />
//       </button>
//     </div>
//   );
// };

// export default Abc;
