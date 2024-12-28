import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

const CourseCard = ({ title, description, instructor_name, badge_text, badge_color, image }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 text-white text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: badge_color }}>
          {badge_text}
        </span>
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm flex items-center mb-2">
          <span className="mr-2">&#128100;</span> {instructor_name}
        </p>
        <h3 className="text-black font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition">View Details</button>
      </div>
    </div>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchCourses = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Unauthorized. Please log in first.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`https://react-interview.crd4lc.easypanel.host/api/course?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data, meta } = response.data.data;
      setCourses(data);
      setCurrentPage(meta.current_page);
      setTotalPages(meta.last_page);
    } catch (error) {
      console.error("Error fetching courses:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      fetchCourses(page);
    }
  };

  return (
    <div className="bg-gray-100 py-10 w-full">
      <div className="flex justify-between items-center px-4">
        <Link to="/addcourses">
          <button className="w-32 bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition">Add Courses</button>
        </Link>
        <button onClick={handleLogout} className="w-32 bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition">
          Logout
        </button>
      </div>
      <h2 className="text-black text-2xl font-bold text-center mb-10">All Courses</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="mx-4 text-black font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseList;
