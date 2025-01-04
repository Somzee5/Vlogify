import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TypingText = () => {
  const phrases = [
    "Log your adventures!",
    "Share your travel experiences.",
    "Discover and inspire others!",
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

export default function CreateVlog() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800">
      {/* Left Section with Sticky Typing Effect */}
      <div className="flex flex-col justify-center items-start w-1/2 px-10 sticky top-0 pt-16">
        <h1 className="text-6xl font-extrabold text-indigo-400 tracking-wide">
          Log New Adventure
        </h1>
        <TypingText />
      </div>

      {/* Right Section for the Form */}
      <div className="flex justify-center items-center w-1/2 bg-gray-900 p-10">
        <div className="w-full max-w-sm flex flex-col space-y-6">
          <h2 className="text-center text-2xl font-semibold text-gray-100">
            Create New Vlog
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
              required
            />
            <textarea
              id="description"
              placeholder="Description"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="location"
              placeholder="Location (e.g. Kalsubai, Maharashtra, India)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="category"
              placeholder="Category"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="file"
              accept="/*"
              multiple
              id="images"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
            />
            <label className="text-white">
              First image will be cover (Max 5)
            </label>
            <input
              type="text"
              id="instagram_reel_link"
              placeholder="Instagram Reel Link (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="text"
              id="youtube_video_link"
              placeholder="YouTube Video Link (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="text"
              id="cost_estimate"
              placeholder="Cost Estimate (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="text"
              id="best_time_to_visit"
              placeholder="Best Time to Visit (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />
            <textarea
              id="reviews"
              placeholder="Reviews (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />
            <input
              type="text"
              id="tags"
              placeholder="Tags (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500 py-2 px-4 text-sm font-bold text-white shadow-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Adventure
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
