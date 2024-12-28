import React from "react";

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

export default CourseCard;
