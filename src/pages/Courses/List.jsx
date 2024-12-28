import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CourseCard = ({ title, description, instructor_name, badge_text, badge_color, image }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "192px", objectFit: "cover" }} />
        <span
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            padding: "4px 12px",
            borderRadius: "999px",
            backgroundColor: badge_color,
          }}
        >
          {badge_text}
        </span>
      </div>
      <div style={{ padding: "16px" }}>
        <p style={{ color: "#6b7280", fontSize: "14px", display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ marginRight: "8px" }}>&#128100;</span> {instructor_name}
        </p>
        <h3 style={{ color: "black", fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>{title}</h3>
        <p style={{ color: "#4b5563", fontSize: "14px", marginBottom: "16px" }}>{description}</p>
        <button
          style={{
            width: "100%",
            backgroundColor: "#6366f1",
            color: "white",
            padding: "8px 0",
            borderRadius: "4px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          View Details
        </button>
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
