import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaClock, FaEye, FaHeart, FaShare, FaCopy, FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getApiUrl, getFrontendUrl } from '../config.js';

export default function Home() {
  const [vlogs, setVlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedVlogId, setCopiedVlogId] = useState(null);
  const { currentUser } = useSelector(state => state.user);

  const categories = [
    'all', 'adventure', 'culture', 'food', 'nature', 'city', 'beach', 'mountain', 'roadtrip', 'trekking'
  ];

  useEffect(() => {
    fetchVlogs();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchVlogs();
    }
  }, [currentUser]);

  const fetchVlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${getApiUrl()}/api/vlog/all`);
      const data = await response.json();
      
      if (response.ok) {
        // Fetch like status for each vlog if user is logged in
        if (currentUser) {
          const vlogsWithLikeStatus = await Promise.all(
            data.map(async (vlog) => {
              try {
                const likeResponse = await fetch(`${getApiUrl()}/api/like/status/${vlog._id}`, {
                  credentials: 'include'
                });
                if (likeResponse.ok) {
                  const { isLiked } = await likeResponse.json();
                  return { ...vlog, isLiked };
                }
                return { ...vlog, isLiked: false };
              } catch (error) {
                return { ...vlog, isLiked: false };
              }
            })
          );
          setVlogs(vlogsWithLikeStatus);
        } else {
          setVlogs(data);
        }
      } else {
        setError('Failed to fetch vlogs');
      }
    } catch (error) {
      setError('Error fetching vlogs');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (vlog) => {
    const shareData = {
      title: vlog.title,
      text: vlog.description.substring(0, 100) + '...',
      url: `${getFrontendUrl()}/vlog/${vlog._id}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(shareData.url);
        setCopiedVlogId(vlog._id);
        setTimeout(() => setCopiedVlogId(null), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopiedVlogId(vlog._id);
        setTimeout(() => setCopiedVlogId(null), 2000);
      } catch (clipboardError) {
        console.error('Error copying to clipboard:', clipboardError);
      }
    }
  };

  const handleCopyLink = async (vlogId) => {
    try {
      const url = `${getFrontendUrl()}/vlog/${vlogId}`;
      await navigator.clipboard.writeText(url);
      setCopiedVlogId(vlogId);
      setTimeout(() => setCopiedVlogId(null), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const handleLike = async (vlogId) => {
    if (!currentUser) {
      // Handle case when user is not logged in
      return;
    }

    try {
      // Check current like status first
      const statusResponse = await fetch(`${getApiUrl()}/api/like/status/${vlogId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (statusResponse.ok) {
        const { isLiked } = await statusResponse.json();
        
        // Toggle like/unlike
        const method = isLiked ? 'DELETE' : 'POST';
        const response = await fetch(`${getApiUrl()}/api/like/${vlogId}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (response.ok) {
          // Update local state
          setVlogs(prevVlogs => 
            prevVlogs.map(vlog => 
              vlog._id === vlogId 
                ? { 
                    ...vlog, 
                    isLiked: !isLiked,
                    likeCount: isLiked ? (vlog.likeCount || 1) - 1 : (vlog.likeCount || 0) + 1
                  }
                : vlog
            )
          );
        } else {
          console.error('Error toggling like:', response.status);
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const filteredVlogs = vlogs.filter(vlog => {
    const searchLower = searchTerm.toLowerCase();
    
    // Search through multiple fields including adventure types and activities
    const matchesSearch = 
      vlog.title.toLowerCase().includes(searchLower) ||
      vlog.description.toLowerCase().includes(searchLower) ||
      vlog.location_name.toLowerCase().includes(searchLower) ||
      vlog.category.toLowerCase().includes(searchLower) ||
      (vlog.tags && vlog.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
      (vlog.cost_estimate && vlog.cost_estimate.toLowerCase().includes(searchLower)) ||
      (vlog.best_time_to_visit && vlog.best_time_to_visit.toLowerCase().includes(searchLower));
    
    const matchesCategory = selectedCategory === 'all' || 
                           vlog.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      adventure: 'from-orange-500 to-red-500',
      culture: 'from-purple-500 to-pink-500',
      food: 'from-yellow-500 to-orange-500',
      nature: 'from-green-500 to-teal-500',
      city: 'from-blue-500 to-indigo-500',
      beach: 'from-cyan-500 to-blue-500',
      mountain: 'from-gray-500 to-slate-500',
      roadtrip: 'from-indigo-500 to-purple-500',
      trekking: 'from-emerald-500 to-green-600'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-indigo-400 text-xl mt-4">Loading adventures...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl">{error}</p>
          <button 
            onClick={fetchVlogs}
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-purple-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover Amazing
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Travel Stories
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore the world through the eyes of passionate travelers. Get inspired by real adventures, 
            authentic experiences, and breathtaking destinations shared by our global community.
          </p>
          
          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search adventures, destinations, activities, or experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vlogs Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {filteredVlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No adventures found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Be the first to share your travel story!'
              }
            </p>
            {currentUser && (
              <Link
                to="/create-vlog"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Share Your Adventure
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">
                {filteredVlogs.length} Adventure{filteredVlogs.length !== 1 ? 's' : ''} Found
              </h2>
              {currentUser && (
                <Link
                  to="/create-vlog"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  + New Adventure
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVlogs.map((vlog) => (
                <div
                  key={vlog._id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
                >
                  {/* Vlog Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={vlog.imageURL && vlog.imageURL[0] ? vlog.imageURL[0] : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                      alt={vlog.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(vlog.category)}`}>
                        {vlog.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button 
                        onClick={() => handleShare(vlog)}
                        className="p-2 bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors group relative"
                        title="Share this adventure"
                      >
                        {copiedVlogId === vlog._id ? (
                          <FaCheck size={16} className="text-green-400" />
                        ) : (
                          <FaShare size={16} />
                        )}
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {copiedVlogId === vlog._id ? 'Link copied!' : 'Share'}
                        </span>
                      </button>
                      
                      <button 
                        onClick={() => handleLike(vlog._id)}
                        className={`p-2 rounded-full text-white transition-colors group relative ${
                          vlog.isLiked 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'bg-black/30 hover:bg-black/50'
                        }`}
                        title={vlog.isLiked ? 'Unlike this adventure' : 'Like this adventure'}
                      >
                        <FaHeart size={16} className={vlog.isLiked ? 'text-white' : 'text-gray-300'} />
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {vlog.isLiked ? 'Unlike' : 'Like'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Vlog Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {vlog.title}
                    </h3>
                    
                    {/* Like Count */}
                    <div className="flex items-center space-x-2 mb-3">
                      <FaHeart className="text-red-500 text-sm" />
                      <span className="text-gray-300 text-sm">
                        {vlog.likeCount || 0} like{vlog.likeCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {vlog.description}
                    </p>

                    {/* Location and Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-300 text-sm">
                        <FaMapMarkerAlt className="text-indigo-400 mr-2" />
                        {vlog.location_name}
                      </div>
                      {vlog.cost_estimate && (
                        <div className="flex items-center text-gray-300 text-sm">
                          <span className="text-green-400 mr-2">₹</span>
                          {vlog.cost_estimate}
                        </div>
                      )}
                      {vlog.best_time_to_visit && (
                        <div className="flex items-center text-gray-300 text-sm">
                          <FaClock className="text-yellow-400 mr-2" />
                          {vlog.best_time_to_visit}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {vlog.tags && vlog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {vlog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Author and Actions */}
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/profile/${vlog.userRef?._id}`} 
                        className="flex items-center space-x-3 group hover:scale-105 transition-all duration-200 cursor-pointer"
                      >
                        <div className="relative">
                          <img
                            src={vlog.userRef?.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                            alt="Author"
                            className="w-10 h-10 rounded-full border-2 border-indigo-500/50 group-hover:border-indigo-400 transition-all duration-200 object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
                        </div>
                        <div className="text-left">
                          <span className="text-gray-300 text-sm font-medium group-hover:text-indigo-400 transition-colors duration-200 block">
                            {vlog.userRef?.username || 'Anonymous'}
                          </span>
                          <span className="text-gray-500 text-xs group-hover:text-indigo-500 transition-colors duration-200">
                            Click to view profile
                          </span>
                        </div>
                      </Link>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Link
                          to={`/vlog/${vlog._id}`}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
                        >
                          <FaEye className="mr-2" />
                          View
                        </Link>
                        
                        <button
                          onClick={() => handleCopyLink(vlog._id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                            copiedVlogId === vlog._id
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          title="Copy link"
                        >
                          {copiedVlogId === vlog._id ? (
                            <>
                              <FaCheck className="mr-1" size={12} />
                              Copied!
                            </>
                          ) : (
                            <>
                              <FaCopy className="mr-1" size={12} />
                              Copy Link
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
