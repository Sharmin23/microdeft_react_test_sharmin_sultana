import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch('https://react-interview.crd4lc.easypanel.host/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'Application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Registration successful! 🎉 Redirecting to login...');
        setError('');
        console.log('Success:', data);

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed.');
        setMessage('');
        console.error('Error:', errorData);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setMessage('');
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 backdrop-filter backdrop-blur-sm bg-opacity-80">
        <h2 className="text-black text-2xl font-bold text-center mb-2">Register Now</h2>
        <p className="text-gray-600 text-center mb-6">Create an account to join our courses!</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Register
          </button>
        </form>
        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
        <div className="text-center mt-4">
          <a href="/login" className="text-indigo-500 hover:underline">
            Login Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
