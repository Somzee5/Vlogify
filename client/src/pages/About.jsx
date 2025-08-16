import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGlobe, 
  FaUsers, 
  FaCamera, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaRocket, 
  FaShieldAlt, 
  FaLightbulb,
  FaCompass,
  FaMountain,
  FaPlane,
  FaCameraRetro,
  FaStar,
  FaAward,
  FaHandshake
} from 'react-icons/fa';

export default function About() {
  const features = [
    {
      icon: <FaCamera className="text-4xl text-indigo-400" />,
      title: "Share Your Adventures",
      description: "Capture and share your travel moments with stunning photos and compelling stories that inspire others to explore the world."
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl text-green-400" />,
      title: "Discover Hidden Gems",
      description: "Find amazing destinations, local experiences, and off-the-beaten-path adventures shared by fellow travelers."
    },
    {
      icon: <FaUsers className="text-4xl text-purple-400" />,
      title: "Connect with Travelers",
      description: "Build a community of like-minded adventurers, share tips, and get inspired by stories from around the globe."
    },
    {
      icon: <FaHeart className="text-4xl text-red-400" />,
      title: "Authentic Experiences",
      description: "Get real, unfiltered travel insights from people who've actually been there, not just promotional content."
    }
  ];

  const stats = [
    { number: "1000+", label: "Adventures Shared" },
    { number: "50+", label: "Countries Explored" },
    { number: "500+", label: "Travel Enthusiasts" },
    { number: "24/7", label: "Community Support" }
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-400" />,
      title: "Authenticity",
      description: "We believe in real stories from real travelers. No fake reviews, no sponsored content - just genuine experiences."
    },
    {
      icon: <FaHandshake className="text-3xl text-green-400" />,
      title: "Community",
      description: "Building a supportive network of travelers who inspire, help, and encourage each other to explore more."
    },
    {
      icon: <FaLightbulb className="text-3xl text-yellow-400" />,
      title: "Innovation",
      description: "Continuously improving our platform to provide the best tools for sharing and discovering travel stories."
    },
    {
      icon: <FaCompass className="text-3xl text-purple-400" />,
      title: "Adventure",
      description: "Encouraging everyone to step out of their comfort zone and embrace the unknown wonders of the world."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="mb-8">
            <FaGlobe className="text-8xl text-indigo-400 mx-auto mb-6 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Vlogify
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to transform how travelers share and discover adventures. 
            Vlogify is more than just a platform - it's a global community of passionate explorers 
            who believe that every journey has a story worth telling.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Explore Adventures
            </Link>
            <Link
              to="/create-vlog"
              className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 font-medium border border-white/20"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            To create the world's most authentic and inspiring travel community, where every adventurer 
            can share their unique experiences and help others discover the beauty of our planet.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-20 border border-gray-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The Vlogify Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Born from a simple idea that every traveler has a unique story to tell, Vlogify started 
                  as a passion project by a group of adventure enthusiasts who were tired of generic travel content.
                </p>
                <p>
                  We wanted to create a space where real travelers could share authentic experiences, 
                  from the hidden cafes in Paris to the remote mountain trails in Nepal. A place where 
                  every adventure, big or small, could inspire someone else to explore.
                </p>
                <p>
                  Today, Vlogify has grown into a vibrant community of storytellers, photographers, 
                  and wanderers who believe that the best travel advice comes from those who've actually 
                  walked the path.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-4 text-center">
                    <FaMountain className="text-3xl text-white mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Mountain Adventures</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-4 text-center">
                    <FaPlane className="text-3xl text-white mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Global Exploration</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-4 text-center">
                    <FaCameraRetro className="text-3xl text-white mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Visual Storytelling</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-500 to-red-600 rounded-lg p-4 text-center">
                    <FaStar className="text-3xl text-white mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Premium Experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-12 border border-indigo-500/20">
            <FaRocket className="text-6xl text-indigo-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who are already sharing their adventures and inspiring others to explore the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Join Vlogify
              </Link>
              <Link
                to="/"
                className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 font-medium border border-white/20"
              >
                Explore Adventures
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
