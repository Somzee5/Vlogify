import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/vlogify_logo.jpg';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={logo}
                className="h-16 w-16 rounded-lg shadow-lg"
                alt="Vlogify Logo"
              />
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Vlogify
                </h3>
                <p className="text-sm text-gray-400">Your Travel Stories, Our Platform</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering travel vloggers to share their adventures with the world. 
              Connect, inspire, and explore together through authentic travel experiences.
            </p>
          </div>

          {/* About Us Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">About Us</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Vlogify is the ultimate platform for travel enthusiasts and content creators. 
              We believe every journey has a story worth sharing, and every traveler has 
              experiences that can inspire others to explore the world.
            </p>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                <span className="text-indigo-400 font-medium">Our Mission:</span> To create a global community of travel storytellers.
              </p>
              <p className="text-gray-400 text-sm">
                <span className="text-indigo-400 font-medium">Our Vision:</span> Making travel inspiration accessible to everyone.
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/create-vlog" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                  Create Vlog
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                  Profile
                </Link>
              </li>
            </ul>
            
            <h5 className="text-md font-semibold text-white mt-6 mb-3">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                <FaYoutube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-indigo-400" />
                <span className="text-gray-400 text-sm">hello@vlogify.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-indigo-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-indigo-400" />
                <span className="text-gray-400 text-sm">Global Community</span>
              </div>
            </div>
            
            <h5 className="text-md font-semibold text-white mt-6 mb-3">Newsletter</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-r-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Vlogify. All rights reserved. Made with ❤️ for travelers worldwide.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
