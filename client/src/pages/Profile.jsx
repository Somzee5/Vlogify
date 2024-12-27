import { useSelector } from "react-redux";
import { FaInstagram, FaYoutube } from "react-icons/fa"; // Instagram and YouTube icons
import { useState, useEffect } from "react";

// Typing Effect Component
const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  let index = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(intervalId);
    }, 100);
    return () => clearInterval(intervalId);
  }, [text]);

  return <h2 className="text-2xl font-semibold text-white">{displayText}</h2>;
};

export default function Profile() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 items-center justify-center relative overflow-hidden">
      {/* Background Image for trekking/mountains */}
      <img
        src="https://media.istockphoto.com/id/1479350931/photo/selfie-of-cheerful-woman-on-the-background-of-railey-bay-in-krabi.jpg?s=2048x2048&w=is&k=20&c=Gs2mx20-vFiJ6NFA-59kX3TE927Te3WY0zdeKyM_lmY=" // Replace with your image
        alt="Trekking"
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
      />

      {/* Profile Card Container */}
      <div className="z-10 w-full max-w-lg flex flex-col items-center space-y-6 p-8 bg-gray-900 bg-opacity-80 rounded-xl shadow-xl transform translate-x-[25%]">
        {/* Profile Header with Typing Effect */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-[#4a57d1]">Your Profile</h1>
          <TypingEffect text="Explore! Share!! Inspire!!!" />
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="mb-6">
            <img
              src={currentUser.avatar}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover border-4 border-[#05060c]"
            />
          </div>

          {/* Profile Form */}
          <form className="w-full flex flex-col items-center">
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={currentUser.username}
              className="mb-4 w-4/5 p-3 border border-gray-600 rounded-md text-lg text-white bg-gray-700"
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={currentUser.email}
              className="mb-4 w-4/5 p-3 border border-gray-600 rounded-md text-lg text-white bg-gray-700"
            />
            <input
              id="password"
              type="text"
              placeholder="Password"
              className="mb-4 w-4/5 p-3 border border-gray-600 rounded-md text-lg text-white bg-gray-700"
            />

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              <a
                href={`https://www.instagram.com/${currentUser.instagram}`}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} className="mr-2" />
                Instagram
              </a>
              <a
                href={`https://www.youtube.com/${currentUser.youtube}`}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={20} className="mr-2" />
                YouTube
              </a>
            </div>

            {/* Update Button */}
            <button className="w-4/5 py-3 bg-[#515ed4] text-white font-bold rounded-md hover:bg-[#1628cb] transition duration-300">
              Update Profile
            </button>
          </form>

          {/* Footer Actions */}
          <div className="mt-6 flex justify-center gap-6">
            <span className="text-red-600 cursor-pointer hover:underline">Delete Account</span>
            <span className="text-blue-500 cursor-pointer hover:underline">Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
