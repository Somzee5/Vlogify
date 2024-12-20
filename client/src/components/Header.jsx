import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg" // Replace this with your custom logo URL.
            className="h-8"
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
            <button
                onClick={() => navigate('/sign-in')}
                className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
            >
                Sign In
            </button>
            </div>

            {/* Profile Icon */}
            <div
            className="ml-8 relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
            onClick={() => navigate('/profile')}
            >
            <svg
                className="absolute w-12 h-12 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
                ></path>
            </svg>
        </div>


      </div>
    </nav>
  );
}
