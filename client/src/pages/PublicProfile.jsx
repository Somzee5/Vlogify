import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaMapMarkerAlt, FaGlobe, FaHeart, FaEye, FaShare, FaCalendarAlt, FaStar, FaCopy, FaCheck } from 'react-icons/fa';
import { MdLocationOn, MdPerson, MdExplore } from 'react-icons/md';

export default function PublicProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userVlogs, setUserVlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedVlogId, setCopiedVlogId] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    fetchUserVlogs();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setUser(data);
      } else {
        setError('Failed to fetch user profile');
      }
    } catch (error) {
      setError('Error fetching user profile');
      console.error('Error:', error);
    }
  };

  const fetchUserVlogs = async () => {
    try {
      const response = await fetch(`/api/user/public/vlog/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setUserVlogs(data);
      } else {
        setError('Failed to fetch user vlogs');
      }
    } catch (error) {
      setError('Error fetching user vlogs');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (vlog) => {
    const shareData = {
      title: vlog.title,
      text: vlog.description.substring(0, 100) + '...',
      url: `${window.location.origin}/vlog/${vlog._id}`
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
      const url = `${window.location.origin}/vlog/${vlogId}`;
      await navigator.clipboard.writeText(url);
      setCopiedVlogId(vlogId);
      setTimeout(() => setCopiedVlogId(null), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const shareToSocialMedia = (platform, vlog) => {
    const url = encodeURIComponent(`${window.location.origin}/vlog/${vlog._id}`);
    const title = encodeURIComponent(vlog.title);
    const text = encodeURIComponent(vlog.description.substring(0, 100) + '...');

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=travel,adventure,vlogify`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

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
          <p className="text-indigo-400 text-xl mt-4">Loading adventurer's profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl">{error || 'User not found'}</p>
          <Link to="/" className="mt-4 inline-block px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Adventure Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
        </div>

        {/* Profile Header */}
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-end space-y-8 lg:space-y-0 lg:space-x-8">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={user.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt={`${user.username}'s Profile`}
                className="w-48 h-48 rounded-full border-4 border-white/20 shadow-2xl object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900 animate-pulse"></div>
            </div>

            {/* Profile Info */}
            <div className="text-center lg:text-left flex-1">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                {user.username}
              </h1>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl">
                Passionate storyteller sharing extraordinary adventures and inspiring journeys across the globe. 
                Every destination has a story, every journey has a lesson.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-400">{userVlogs.length}</div>
                  <div className="text-gray-400 text-sm">Adventures Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">∞</div>
                  <div className="text-gray-400 text-sm">Stories to Tell</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">🌍</div>
                  <div className="text-gray-400 text-sm">World Explorer</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {user.instagram && (
                  <a
                    href={`https://www.instagram.com/${user.instagram}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:from-pink-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FaInstagram className="mr-2" size={20} />
                    Follow on Instagram
                  </a>
                )}
                {user.youtube && (
                  <a
                    href={`https://www.youtube.com/user/${user.youtube}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FaYoutube className="mr-2" size={20} />
                    Subscribe on YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Adventure Collection
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Embark on a journey through {user.username}'s most captivating adventures, 
            from hidden gems to iconic destinations, each story crafted with passion and authenticity.
          </p>
        </div>

        {/* Vlogs Grid */}
        {userVlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No adventures shared yet</h3>
            <p className="text-gray-400 mb-6">
              {user.username} is just beginning their journey. Check back soon for amazing stories!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userVlogs.map((vlog) => (
              <div
                key={vlog._id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50 group"
              >
                {/* Vlog Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vlog.imageURL && vlog.imageURL[0] ? vlog.imageURL[0] : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                    alt={vlog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
                      onClick={() => shareToSocialMedia('twitter', vlog)}
                      className="p-2 bg-black/30 rounded-full text-white hover:bg-blue-500 transition-colors group relative"
                      title="Share on Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Share on Twitter
                      </span>
                    </button>
                    
                    <button 
                      onClick={() => shareToSocialMedia('facebook', vlog)}
                      className="p-2 bg-black/30 rounded-full text-white hover:bg-blue-600 transition-colors group relative"
                      title="Share on Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      {/* Tooltip */}
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Share on Facebook
                      </span>
                    </button>
                  </div>
                </div>

                {/* Vlog Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {vlog.title}
                  </h3>
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
                        <span className="text-green-400 mr-2">💰</span>
                        {vlog.cost_estimate}
                      </div>
                    )}
                    {vlog.best_time_to_visit && (
                      <div className="flex items-center text-gray-300 text-sm">
                        <FaCalendarAlt className="text-yellow-400 mr-2" />
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

                  {/* View Button */}
                  <div className="flex justify-center">
                    <Link
                      to={`/vlog/${vlog._id}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
                    >
                      <FaEye className="mr-2" />
                      Explore Adventure
                    </Link>
                  </div>

                  {/* Share Options */}
                  <div className="mt-3 flex justify-center space-x-2">
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
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-8 border border-indigo-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Inspired by {user.username}'s Adventures?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Every journey begins with a single step. Start sharing your own travel stories 
              and inspire others to explore the world around them.
            </p>
            <Link
              to="/create-vlog"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <MdExplore className="mr-2" size={20} />
              Share Your Adventure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
