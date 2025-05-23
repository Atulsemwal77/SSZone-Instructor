import React from "react";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    student: "Mice Jerry",
    date: "January 30, 2021",
    course: "Speaking Korean for Beginners",
    rating: 5,
    reviewCount: 10,
    comment: "Good",
  },
  {
    student: "Mice Jerry",
    date: "January 30, 2021",
    course: "PHP for Beginners",
    rating: 5,
    reviewCount: 5,
    comment: "Awesome",
  },
  {
    student: "Mice Jerry",
    date: "January 30, 2021",
    course: "WordPress for Beginners",
    rating: 4.5,
    reviewCount: 15,
    comment: "Nice Course",
  },
  {
    student: "Mice Jerry",
    date: "January 30, 2021",
    course: "Speaking Korean for Beginners",
    rating: 5,
    reviewCount: 24,
    comment: "Good",
  },
];

const Reviews = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100 text-sm sm:text-base">
              <th className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Student</th>
              <th className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Date</th>
              <th className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr
                key={index}
                className={index % 2 === 1 ? "bg-blue-50" : ""}
              >
                <td className="py-4 px-4 whitespace-nowrap">{review.student}</td>
                <td className="py-4 px-4 whitespace-nowrap">{review.date}</td>
                <td className="py-4 px-4 min-w-[200px]">
                  <div className="mb-1 text-sm sm:text-base">
                    Course: <span className="font-medium">{review.course}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    {[...Array(Math.floor(review.rating))].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                    {review.rating % 1 !== 0 && (
                      <FaStar className="opacity-50" />
                    )}
                    <span className="text-gray-600 ml-2">
                      ({String(review.reviewCount).padStart(2, "0")} Reviews)
                    </span>
                  </div>
                  <div className="text-blue-600 font-medium text-sm mt-1">
                    {review.comment}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reviews;
