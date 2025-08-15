import React, { useState, useEffect } from 'react';
import logo from '../assets/vlogify_logo.jpg';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Hide loader after completion
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Logo with Animation */}
        <div className="relative mb-8">
          <div className="relative">
            <img
              src={logo}
              alt="Vlogify Logo"
              className="w-32 h-32 rounded-2xl shadow-2xl animate-pulse"
            />
            {/* Glowing Ring Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 animate-ping"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-400 opacity-10 animate-pulse"></div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute -top-4 -left-4 w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-4 -left-2 w-2 h-2 bg-indigo-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-2 -right-4 w-3 h-3 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Loading Text */}
        <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Vlogify
          </span>
        </h2>
        
        <p className="text-gray-300 text-lg mb-8 animate-pulse">
          Loading your adventures...
        </p>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="text-right mt-2">
            <span className="text-indigo-400 font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Subtle Text Animation */}
        <div className="mt-8 text-gray-400 text-sm animate-pulse">
          <p>Preparing your travel inspiration...</p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-indigo-500/30 rounded-tl-3xl"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-purple-500/30 rounded-tr-3xl"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-purple-500/30 rounded-bl-3xl"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-indigo-500/30 rounded-br-3xl"></div>
    </div>
  );
}
