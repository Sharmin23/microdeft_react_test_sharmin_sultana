import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('https://react-interview.crd4lc.easypanel.host/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'Application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Login successful! 🎉');
        console.log('Success:', data);
      } else {
        setMessage('Registration failed. Please check your inputs.');
        console.error('Failed to register:', response.status);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
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
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Login
          </button>
        </form>
        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        <div className="text-center mt-4">
          <a href="/register" className="text-indigo-500 hover:underline">
            Do not have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
