import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/vlogify_logo.jpg';

export default function Footer() {
  return (
    <div className="bg-[#0a192f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src={logo} alt="Vlogify Logo" className="w-[200px] h-[200px] mb-4" />
            <h3 className="text-xl font-bold mb-4">Vlogify</h3>
            <p className="text-gray-400">
              Your trusted partner in travel storytelling, connecting adventurers with
              authentic experiences and providing a platform to share your journeys.
            </p>
          </div>

          {/* Quick Links 01 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/create-vlog" className="text-gray-400 hover:text-white">
                  Create Vlog
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 02 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/vlog" className="text-gray-400 hover:text-white">
                  Explore Vlogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="mailto:hello@vlogify.com" className="text-gray-400 hover:text-white">
                  Email Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
            <a
              href="mailto:hello@vlogify.com"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaEnvelope className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vlogify. All rights reserved. Made with ❤️ for travelers worldwide.</p>
        </div>
      </div>
    </div>
  );
}
