import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUser } from "../redux/user/userSlice.js";

// Typing Effect Component
const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(intervalId);
    }, 100);
    return () => clearInterval(intervalId);
  }, [text]);

  return <h2 className="text-2xl font-semibold text-white">{displayText}</h2>;
};

// Modal Component for Social Links Update
const SocialLinkModal = ({ isOpen, onClose, onSave, initialValue, platform }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) {
      setInputValue(initialValue);
    }
  }, [isOpen, initialValue]);

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Update {platform} Link
        </h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Enter your ${platform} ID`}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800"
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user); // Get user data from Redux store
  const [imageUrl, setImageUrl] = useState(currentUser.avatar);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
    instagram: currentUser.instagram || "",
    youtube: currentUser.youtube || "",
  });
  const fileRef = useRef(null); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlatform, setModalPlatform] = useState("");
  const [modalInitialValue, setModalInitialValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setUploadSuccess(false);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
        setUploadSuccess(true);
        setFormData({ ...formData, avatar: data.imageUrl });
      } else {
        console.error("Image upload failed:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Profile updated successfully:", updatedUser);

        // Update Redux store with new user data
        dispatch(updateUser(updatedUser));

        // Update local state for form
        setFormData({
          ...formData,
          username: updatedUser.username,
          email: updatedUser.email,
          instagram: updatedUser.instagram,
          youtube: updatedUser.youtube,
        });

        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000); // clearing after 3s
      } 
      else 
      {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const openModal = (platform) => {
    setModalPlatform(platform);
    setModalInitialValue(formData[platform]);
    setIsModalOpen(true);
  };

  const handleModalSave = (value) => {
    setFormData({ ...formData, [modalPlatform]: value });
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',
      });

      const data = await res.json();

      if(data.success === false)
      {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('api/auth/sign-out');
      const data = await res.json();

      if(data.success === false)
      {
        dispatch(signOutUserFailure(data.message));
        return;
      } 

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };


  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 items-center justify-center relative overflow-hidden">
      {/* Background Image for trekking/mountains */}
      <img
        src="https://media.istockphoto.com/id/1479350931/photo/selfie-of-cheerful-woman-on-the-background-of-railey-bay-in-krabi.jpg?s=2048x2048&w=is&k=20&c=Gs2mx20-vFiJ6NFA-59kX3TE927Te3WY0zdeKyM_lmY="
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
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
            <img
              onClick={() => fileRef.current.click()}
              src={imageUrl || currentUser.avatar}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover border-4 border-[#05060c] hover:cursor-pointer"
            />
            {uploading && (
              <>
                <p className="text-white mt-2">Uploading...</p>
                <div className="w-full bg-gray-700 h-2 mt-2 rounded-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "100%" }} // Simulated progress bar
                  ></div>
                </div>
              </>
            )}
            {uploadSuccess && <p className="text-green-500 mt-2">Profile photo updated successfully!</p>}
          </div>
          {/* Profile Form */}
          <form className="w-full flex flex-col items-center">
            <input
              id="username"
              type="text"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
              className="mb-4 w-4/5 p-3 border border-gray-600 rounded-md text-lg text-white bg-gray-700"
            />
            <input
              id="email"
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className="mb-4 w-4/5 p-3 border border-gray-600 rounded-md text-lg text-white bg-gray-700"
            />
            <input
              id="password"
              type="password"
              value={formData.password} // Keep it blank initially
              placeholder="•••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mb-4 w-4/5 p-3 border border-gray-600 rounded-md text-lg text-white bg-gray-700"
            />

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => {
                  if (formData.instagram) {
                    window.open(`https://www.instagram.com/${formData.instagram}/`, "_blank");
                  } else {
                    openModal("instagram");
                  }
                }}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full"
              >
                <FaInstagram size={20} className="mr-2" />
                Instagram
              </button>
              <button
                type="button"
                onClick={() => {
                  if (formData.youtube) {
                    window.open(`https://www.youtube.com/user/${formData.youtube}/`, "_blank");
                  } else {
                    openModal("youtube");
                  }
                }}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-full"
              >
                <FaYoutube size={20} className="mr-2" />
                YouTube
              </button>
            </div>
            
            {/* Update Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-4/5 py-3 bg-[#515ed4] text-white font-bold rounded-md hover:bg-[#1628cb] transition duration-300"
            >
              Update Profile
            </button>
            <div className="mt-4 w-4/5">
              <Link
                to="/create-vlog"
                className="block text-center py-3 bg-[#4caf50] text-white font-bold rounded-md hover:bg-[#388e3c] transition duration-300"
              >
                Log New Adventure
              </Link>
            </div>
            {/* Success Message */}
            {successMessage && (
              <div className="text-green-500 mt-4 text-center">
                {successMessage}
              </div>
            )}

          </form>
        </div>
        {/* Footer Actions */}
        <div className="mt-6 flex justify-center gap-6">
          <span 
            onClick={handleDeleteUser}
            className="text-red-600 cursor-pointer hover:underline">
              Delete Account
          </span>
          <span 
            onClick={handleSignOut}
            className="text-blue-500 cursor-pointer hover:underline">
              Sign Out
          </span>
        </div>
      </div>
      {/* Social Link Modal */}
      <SocialLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        initialValue={modalInitialValue}
        platform={modalPlatform}
      />
    </div>
  );
}
