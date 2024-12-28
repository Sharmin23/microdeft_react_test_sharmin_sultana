import React from "react";

const CourseCard = ({ title, description, author, badge, image }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <span className="absolute top-2 left-2 bg-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full">{badge}</span>
      </div>
      <div className="p-4">
        <p className="text-gray-500 text-sm flex items-center mb-2">
          <span className="mr-2">&#128100;</span> {author}
        </p>
        <h3 className="text-black font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition">View Details</button>
      </div>
    </div>
  );
};

const CourseListing = () => {
  const courses = [
    {
      title: "Creational Design Patterns in Java/J2EE",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "Author Name",
      badge: "Failed",
      image: "https://via.placeholder.com/400x300", // Replace with actual image URL
    },
    {
      title: "Creational Design Patterns in Java/J2EE",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "Author Name",
      badge: "Failed",
      image: "https://via.placeholder.com/400x300", // Replace with actual image URL
    },
    {
      title: "Creational Design Patterns in Java/J2EE",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "Author Name",
      badge: "Failed",
      image: "https://via.placeholder.com/400x300", // Replace with actual image URL
    },
    {
      title: "Creational Design Patterns in Java/J2EE",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "Author Name",
      badge: "Failed",
      image: "https://via.placeholder.com/400x300", // Replace with actual image URL
    },
    {
      title: "Creational Design Patterns in Java/J2EE",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      author: "Author Name",
      badge: "Failed",
      image: "https://via.placeholder.com/400x300", // Replace with actual image URL
    },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="flex justify-end items-end px-4">
        <a href="/addcourses">
          <button className="w-32 bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition">Add Courses</button>
        </a>
      </div>
      <h2 className="text-black text-2xl font-bold text-center mb-10">All Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CourseListing;
