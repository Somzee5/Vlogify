import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../config.js';
import OAuth from '../components/OAuth';

const TypingText = () => {
  const phrases = [
    "Explore the world with us!",
    "Share your travel experiences.",
    "Discover new destinations!",
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[index];

    const typingInterval = setInterval(() => {
      if (charIndex < currentPhrase.length) {
        setText((prev) => prev + currentPhrase[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setText("");
          setCharIndex(0);
          setIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [charIndex, index]);

  return <div className="text-lg text-gray-400 mt-4">{text}</div>;
};

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
     setFormData({
      ...formData,
      [e.target.id] : e.target.value,
     });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try
    {
      setLoading(true);

      const res = await fetch(`${getApiUrl()}/api/auth/sign-up`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      console.log(data);

      if(data.success === false)
      {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch(error)
    {
      setLoading(false);
      setError(error.message);
    }

    
  };

  console.log(formData);

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-start w-1/2 px-10">
        <h1 className="text-6xl font-extrabold text-indigo-400 tracking-wide">
          Vlogiify
        </h1>
        <TypingText />
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center w-1/2 bg-gray-900 p-10">
        <div className="w-full max-w-sm flex flex-col space-y-6">
          <h2 className="text-center text-2xl font-semibold text-gray-100">
            Create your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />

            {/* OAuth Button */}
            <OAuth />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-500 py-2 px-4 text-sm font-bold text-white shadow-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? 'Loading...' : 'SignUp'}
            </button>

            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{' '}
              <a href="/sign-in" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Sign In
              </a>
            </p>

          </form>

          {error && (
            <div className="mt-4 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}