import React, { useState, useEffect } from 'react';
import logo from '../assets/vlogify_logo.jpg';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loader after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Rotating Logo */}
        <div className="mb-8">
          <img
            src={logo}
            alt="Vlogify Logo"
            className="w-32 h-32 rounded-2xl shadow-2xl animate-spin"
            style={{ animationDuration: '2s' }}
          />
        </div>

        
        
        <p className="text-gray-400 text-lg">
          Loading your adventures...
        </p>
      </div>
    </div>
  );
}
