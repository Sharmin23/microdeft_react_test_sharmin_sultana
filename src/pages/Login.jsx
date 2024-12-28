import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/courseslist");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://react-interview.crd4lc.easypanel.host/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "Application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("authToken", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        setMessage("Login successful! ");
        console.log("Success:", data);

        navigate("/courseslist");
      } else {
        setMessage("Login failed. Please check your inputs.");
        console.error("Failed to login:", response.status);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 backdrop-filter backdrop-blur-sm bg-opacity-80">
        <h2 className="text-black text-2xl font-bold text-center mb-2">Login Now</h2>
        <p className="text-gray-600 text-center mb-6">Sign in to access all the courses.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-200">
            Login
          </button>
        </form>
        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        <div className="text-center mt-4">
          <Link to="/register" className="text-indigo-500 hover:underline">
            Do not have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
