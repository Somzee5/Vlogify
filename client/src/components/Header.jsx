import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/vlogify_logo.jpg'


export default function Header() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={logo} // Replace this with your custom logo URL.
            className="h-8 bg-transparent"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-slate-100">
            Vlogiify
          </span>
        </a>

        {/* Search Bar */}
        <div className="flex-grow flex justify-center">
          <form className='flex items-center dark:bg-gray-700 shadow rounded-lg border-gray-300 px-3 focus:border-blue-500 focus:ring-blue-500'>
            <input
                type="text"
                placeholder="Search..."
                className="block w-64 p-2 text-s   bg-gray-50   dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <FaSearch className='text-blue-800'></FaSearch>
            
          </form>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
            <a
                href="/"
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
            >
                Home
            </a>
            <a
                href="/about"
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
            >
                About
            </a>


            <Link to='/profile'>
              {currentUser ? (
                <img
                  src= { currentUser.avatar }
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                
              ) : (
                <button
                  className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
                >
                  Sign In
                </button>
              )}
            </Link>


            


          </div>
      </div>
    </nav>
  );
}
