import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector

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
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from state
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageSubmit = async (e) => {
    if (files.length === 0) {
      console.log("No files selected.");
      return;
    }
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const response = await fetch("/api/upload/multiple", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setImageURLs((prev) => [...prev, ...data.imageUrls]);
        setUploadSuccess(true);
        console.log("Image upload succeeded:", data.imageUrls);
      } else {
        console.error("Image upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setImageURLs((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      imageURL: imageURLs,
      userRef: currentUser._id, // Add userRef from currentUser
    };
    try {
      const response = await fetch("/api/vlog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Vlog created successfully:", data);
        navigate("/");
      } else {
        console.error("Failed to create vlog:", data.message);
      }
    } catch (error) {
      console.error("Error creating vlog:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800">
      <div className="flex flex-col justify-center items-start w-1/2 px-10 sticky top-0 pt-16">
        <h1 className="text-6xl font-extrabold text-indigo-400 tracking-wide">
          Log New Adventure
        </h1>
        <TypingText />
      </div>

      <div className="flex justify-center items-center w-1/2 bg-gray-900 p-10">
        <div className="w-full max-w-sm flex flex-col space-y-6">
          <h2 className="text-center text-2xl font-semibold text-gray-100">
            Create New Vlog
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              id="title"
              placeholder="Title"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} 
              required
            />
            <textarea
              id="description"
              placeholder="Description"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
            <input
              type="text"
              id="location_name"
              placeholder="Location (e.g. Kalsubai, Maharashtra, India)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, location_name: e.target.value }))}
              required
            />
            <input
              type="text"
              id="category"
              placeholder="Category"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              required
            />
            <input
              type="file"
              accept="/*"
              multiple
              id="images"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFiles(e.target.files)}
            />
            <label className="text-white">First image will be cover (Max 5)</label>
            <button
              type="button"
              onClick={handleImageSubmit}
              className="rounded-md bg-indigo-500 mx-3 py-2 px-4 text-sm font-bold text-white shadow-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Upload
            </button>
            {/* Display uploaded images */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {imageURLs.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="h-20 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <input
              type="text"
              id="instagram_reel_link"
              placeholder="Instagram Reel Link (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, instagram_reel_link: e.target.value }))}
            />
            <input
              type="text"
              id="youtube_video_link"
              placeholder="YouTube Video Link (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, youtube_video_link: e.target.value }))}
            />
            <input
              type="text"
              id="cost_estimate"
              placeholder="Cost Estimate (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, cost_estimate: e.target.value }))}
            />
            <input
              type="text"
              id="best_time_to_visit"
              placeholder="Best Time to Visit (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, best_time_to_visit: e.target.value }))}
            />
            <textarea
              id="reviews"
              placeholder="Reviews (optional)"
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 py-2 px-3 text-white placeholder-gray-500 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => setFormData((prev) => ({ ...prev, reviews: e.target.value }))}
            />
            <div className="text-center">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 py-2 px-4 text-sm font-bold text-white shadow-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create Vlog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}