import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const AddCourseForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [badgeColor, setBadgeColor] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      if (!token) {
        setMessage("Unauthorized. Please log in first.");
        return;
      }

      const response = await fetch("https://react-interview.crd4lc.easypanel.host/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "Application/json",
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
        body: JSON.stringify({
          title,
          description,
          badge_text: badgeText,
          badge_color: badgeColor,
          instructor_name: instructorName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Course added successfully! 🎉");
        console.log("Success:", data);
        navigate("/courseslist"); // Redirect to courses list page
      } else {
        setMessage("Failed to add course. Please check your inputs.");
        console.error("Failed to add course:", response.status);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-md">
        <Link to="/courseslist">
          <IoMdArrowBack className="text-black text-2xl -ml-2 -mt-3" />
        </Link>
        <h2 className="text-black text-2xl font-bold mb-2">Add New Course</h2>
        <p className="text-gray-600 mb-6">Please fill in the below information to add a new course</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Description"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Badge Text"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Badge Color"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              value={badgeColor}
              onChange={(e) => setBadgeColor(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Instructor Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default AddCourseForm;
