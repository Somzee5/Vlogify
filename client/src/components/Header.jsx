import { FaPlus, FaGlobe, FaUsers, FaMountain, FaCompass } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/vlogify_logo.jpg'

export default function Header() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-indigo-500/20">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
          <img
            src={logo}
            className="h-20 w-20 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
            alt="Vlogify Logo"
          />
        </Link>

        {/* Quick Stats & Actions Section */}
        <div className="flex-grow flex justify-center">
          <div className="flex items-center space-x-8">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <FaGlobe className="text-indigo-400" />
                <span>1000+ Adventures</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaUsers className="text-green-400" />
                <span>500+ Travelers</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaMountain className="text-purple-400" />
                <span>50+ Countries</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              {currentUser && (
                <Link
                  to="/create-vlog"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <FaPlus className="text-sm" />
                  <span className="hidden sm:inline">Share Adventure</span>
                  <span className="sm:hidden">+</span>
                </Link>
              )}
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 hover:text-white transition-all duration-200 font-medium border border-white/20"
              >
                <FaCompass className="text-sm" />
                <span className="hidden sm:inline">Explore</span>
                <span className="sm:hidden">🌍</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 font-medium"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 font-medium"
          >
            About
          </Link>

          {currentUser ? (
            <Link to='/profile' className="flex items-center space-x-2 group">
              <img
                src={currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500/50 group-hover:border-indigo-400 transition-colors duration-200"
              />
              <span className="text-gray-300 group-hover:text-indigo-400 transition-colors duration-200 text-sm font-medium">
                {currentUser.username}
              </span>
            </Link>
          ) : (
            <Link to="/sign-in">
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
