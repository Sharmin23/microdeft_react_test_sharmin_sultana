import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import CourseCard from "./../../Components/Courses/CourseCard";

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
    <div style={{ backgroundColor: "#f3f4f6", padding: "40px 0", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
        <Link to="/addcourses">
          <button
            style={{
              width: "128px",
              backgroundColor: "#6366f1",
              color: "white",
              padding: "8px 0",
              borderRadius: "4px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add Courses
          </button>
        </Link>
        <button
          onClick={handleLogout}
          style={{
            width: "128px",
            backgroundColor: "#ef4444",
            color: "white",
            padding: "8px 0",
            borderRadius: "4px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      <h2 style={{ color: "black", fontSize: "24px", fontWeight: "bold", textAlign: "center", margin: "40px 0" }}>All Courses</h2>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", padding: "0 16px" }}>
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === 1 ? "#d1d5db" : "#6366f1",
            color: "white",
            fontWeight: "600",
            borderRadius: "4px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ margin: "0 16px", color: "black", fontWeight: "500" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "8px 16px",
            backgroundColor: currentPage === totalPages ? "#d1d5db" : "#6366f1",
            color: "white",
            fontWeight: "600",
            borderRadius: "4px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseList;
