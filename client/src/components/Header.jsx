import { FaSearch } from 'react-icons/fa';
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
            className="h-12 w-12 rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
            alt="Vlogify Logo"
          />
          <span className="self-center text-3xl font-bold whitespace-nowrap bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Vlogify
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow flex justify-center max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search adventures..."
              className="block w-full p-3 pl-10 text-sm bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

          <Link to='/profile'>
            {currentUser ? (
              <div className="flex items-center space-x-2 group">
                <img
                  src={currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500/50 group-hover:border-indigo-400 transition-colors duration-200"
                />
                <span className="text-gray-300 group-hover:text-indigo-400 transition-colors duration-200 text-sm font-medium">
                  {currentUser.username}
                </span>
              </div>
            ) : (
              <Link to="/sign-in">
                <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Sign In
                </button>
              </Link>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
