import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaHeart, 
  FaShare, 
  FaInstagram, 
  FaYoutube, 
  FaEye, 
  FaCalendarAlt,
  FaStar,
  FaGlobe,
  FaArrowLeft,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getApiUrl } from '../config.js';

export default function Vlog() {
    SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

    const [vlog, setVlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userVlogs, setUserVlogs] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [copied, setCopied] = useState(false);
    const params = useParams();
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchVlog = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${getApiUrl()}/api/vlog/get/${params.vlogId}`);
                const data = await res.json();

                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }

                setVlog(data);
                
                // Fetch like status if user is properly logged in
                if (currentUser && currentUser._id && currentUser.username) {
                    console.log('Fetching like status for vlog:', params.vlogId);
                    try {
                        const likeRes = await fetch(`${getApiUrl()}/api/like/status/${params.vlogId}`, {
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        });
                        if (likeRes.ok) {
                            const { isLiked } = await likeRes.json();
                            setIsLiked(isLiked);
                        } else {
                            // Set default state for any error
                            setIsLiked(false);
                        }
                    } catch (error) {
                        console.error('Error fetching like status:', error);
                        setIsLiked(false);
                    }
                } else {
                    // User not logged in, set default state
                    setIsLiked(false);
                }

                // Fetch other vlogs by the same user
                if (data.userRef?._id) {
                    try {
                        const userVlogsRes = await fetch(`${getApiUrl()}/api/user/public/vlog/${data.userRef._id}`);
                        if (userVlogsRes.ok) {
                            const userVlogsData = await userVlogsRes.json();
                            // Filter out current vlog
                            setUserVlogs(userVlogsData.filter(v => v._id !== params.vlogId).slice(0, 3));
                        }
                    } catch (error) {
                        console.error('Error fetching user vlogs:', error);
                    }
                }

                setLoading(false);
                setError(false);
            } catch (error) {
                console.error("Error fetching vlog:", error);
                setError(true);
                setLoading(false);
            }
        };

        fetchVlog();
    }, [params.vlogId, currentUser?._id]);

    const handleLike = async () => {
        if (!currentUser || !currentUser._id || !currentUser.username) {
            console.log('User not properly authenticated, redirecting to sign-in');
            window.location.href = '/sign-in';
            return;
        }

        try {
            const method = isLiked ? 'DELETE' : 'POST';
            const response = await fetch(`${getApiUrl()}/api/like/${params.vlogId}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (response.ok) {
                setIsLiked(!isLiked);
                setVlog(prev => ({
                    ...prev,
                    likeCount: isLiked ? (prev.likeCount || 1) - 1 : (prev.likeCount || 0) + 1
                }));
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: vlog.title,
            text: vlog.description.substring(0, 100) + '...',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (error) {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
                    <p className="text-indigo-400 text-xl mt-4">Loading your adventure...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-red-400">
                    <p className="text-xl">Something went wrong</p>
                    <Link to="/" className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link 
                    to="/" 
                    className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                    <FaArrowLeft />
                    <span>Back to Adventures</span>
                </Link>
            </div>

            {vlog && (
                <div className="max-w-7xl mx-auto px-4 pb-16">
                    {/* Hero Section with Image Slider */}
                    <div className="mb-12">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            {vlog.imageURL && vlog.imageURL.length > 0 ? (
                                <Swiper
                                    navigation
                                    pagination={{ clickable: true }}
                                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                                    effect="fade"
                                    className="h-[600px] md:h-[700px]"
                                >
                                    {vlog.imageURL.map((url, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={url}
                                                    alt={`${vlog.title} - Image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                                                
                                                {/* Image Counter */}
                                                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                                    {index + 1} / {vlog.imageURL.length}
                                                </div>
                                            </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                            ) : (
                                <div className="h-[400px] bg-gray-800 flex items-center justify-center">
                                    <div className="text-center text-gray-400">
                                        <FaGlobe className="text-6xl mx-auto mb-4" />
                                        <p>No images available</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Header */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(vlog.category)}`}>
                                        {vlog.category}
                                    </span>
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <FaEye />
                                        <span className="text-sm">Viewing</span>
                                    </div>
                                </div>
                                
                                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    {vlog.title}
                                </h1>
                                
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    {vlog.description}
                                </p>
                            </div>

                            {/* Location & Details */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                    <FaMapMarkerAlt className="text-indigo-400 mr-2" />
                                    Adventure Details
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 text-gray-300">
                                        <FaMapMarkerAlt className="text-indigo-400" />
                                        <span>{vlog.location_name}</span>
                                    </div>
                                    
                                    {vlog.cost_estimate && (
                                        <div className="flex items-center space-x-3 text-gray-300">
                                            <span className="text-green-400">₹</span>
                                            <span>{vlog.cost_estimate}</span>
                                        </div>
                                    )}
                                    
                                    {vlog.best_time_to_visit && (
                                        <div className="flex items-center space-x-3 text-gray-300">
                                            <FaClock className="text-yellow-400" />
                                            <span>{vlog.best_time_to_visit}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center space-x-3 text-gray-300">
                                        <FaCalendarAlt className="text-purple-400" />
                                        <span>Posted {formatDate(vlog.createdAt)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews */}
                            {vlog.reviews && (
                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <FaStar className="text-yellow-400 mr-2" />
                                        Traveler's Review
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">{vlog.reviews}</p>
                                </div>
                            )}

                            {/* Tags */}
                            {vlog.tags && vlog.tags.length > 0 && (
                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-semibold text-white mb-4">Adventure Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {vlog.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded-full border border-indigo-500/30"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Location Map */}
                            {vlog.latitude && vlog.longitude && (
                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                        <FaMapMarkerAlt className="text-indigo-400 mr-2" />
                                        Adventure Location
                                    </h3>
                                    <div className="bg-gray-900 rounded-lg p-4 text-center">
                                        <p className="text-gray-300 mb-4">
                                            📍 Coordinates: {vlog.latitude.toFixed(6)}, {vlog.longitude.toFixed(6)}
                                        </p>
                                        <a
                                            href={`https://www.google.com/maps?q=${vlog.latitude},${vlog.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                                        >
                                            <FaExternalLinkAlt />
                                            <span>Open in Google Maps</span>
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Social Media Links */}
                            {(vlog.instagram_reel_link || vlog.youtube_video_link) && (
                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-semibold text-white mb-4">More Content</h3>
                                    <div className="flex flex-wrap gap-4">
                                        {vlog.instagram_reel_link && (
                                            <a
                                                href={vlog.instagram_reel_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                                            >
                                                <FaInstagram />
                                                <span>Watch on Instagram</span>
                                                <FaExternalLinkAlt className="text-sm" />
                                            </a>
                                        )}
                                        
                                        {vlog.youtube_video_link && (
                                            <a
                                                href={vlog.youtube_video_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
                                            >
                                                <FaYoutube />
                                                <span>Watch on YouTube</span>
                                                <FaExternalLinkAlt className="text-sm" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Author Info */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                <h3 className="text-lg font-semibold text-white mb-4">Adventure Creator</h3>
                                
                                {vlog.userRef ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={vlog.userRef.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                                alt={vlog.userRef.username}
                                                className="w-16 h-16 rounded-full border-2 border-indigo-500/50 object-cover"
                                            />
                                            <div>
                                                <h4 className="text-white font-medium">{vlog.userRef.username}</h4>
                                                <p className="text-gray-400 text-sm">Travel Enthusiast</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex space-x-3">
                                            {vlog.userRef.instagram && (
                                                <a
                                                    href={`https://www.instagram.com/${vlog.userRef.instagram}/`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-center hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
                                                >
                                                    <FaInstagram className="mx-auto" />
                                                </a>
                                            )}
                                            
                                            {vlog.userRef.youtube && (
                                                <a
                                                    href={`https://www.youtube.com/@${vlog.userRef.youtube}/`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-center hover:from-red-600 hover:to-red-700 transition-all duration-200"
                                                >
                                                    <FaYoutube className="mx-auto" />
                                                </a>
                                            )}
                                        </div>
                                        
                                        <Link
                                            to={`/profile/${vlog.userRef._id}`}
                                            className="block w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                ) : (
                                    <p className="text-gray-400">Anonymous Creator</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                <h3 className="text-lg font-semibold text-white mb-4">Show Some Love</h3>
                                
                                <div className="space-y-3">
                                    <button
                                        onClick={handleLike}
                                        className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-200 ${
                                            isLiked
                                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                        }`}
                                    >
                                        <FaHeart className={isLiked ? 'text-white' : 'text-gray-400'} />
                                        <span>{isLiked ? 'Liked' : 'Like'}</span>
                                    </button>
                                    
                                    <button
                                        onClick={handleShare}
                                        className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200"
                                    >
                                        <FaShare />
                                        <span>{copied ? 'Copied!' : 'Share'}</span>
                                    </button>
                                </div>
                                
                                <div className="mt-4 text-center">
                                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                                        <FaHeart className="text-red-500" />
                                        <span className="text-white font-medium">{vlog.likeCount || 0}</span>
                                        <span>people loved this adventure</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                                <h3 className="text-lg font-semibold text-white mb-4">Adventure Stats</h3>
                                
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Category</span>
                                        <span className="text-white font-medium capitalize">{vlog.category}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Images</span>
                                        <span className="text-white font-medium">{vlog.imageURL?.length || 0}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Tags</span>
                                        <span className="text-white font-medium">{vlog.tags?.length || 0}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Posted</span>
                                        <span className="text-white font-medium">{formatDate(vlog.createdAt)}</span>
                                    </div>
                                    
                                    {vlog.latitude && vlog.longitude && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Location</span>
                                            <span className="text-white font-medium text-xs">
                                                {vlog.latitude.toFixed(4)}, {vlog.longitude.toFixed(4)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* More Adventures by Creator */}
                    {userVlogs.length > 0 && (
                        <div className="mt-16">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    More Adventures by {vlog.userRef?.username || 'This Creator'}
                                </h2>
                                <p className="text-gray-400">Discover more amazing stories from this travel enthusiast</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userVlogs.map((userVlog) => (
                                    <Link
                                        key={userVlog._id}
                                        to={`/vlog/${userVlog._id}`}
                                        className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700/50"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={userVlog.imageURL && userVlog.imageURL[0] ? userVlog.imageURL[0] : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                                                alt={userVlog.title}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            <div className="absolute bottom-3 left-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(userVlog.category)}`}>
                                                    {userVlog.category}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                                                {userVlog.title}
                                            </h3>
                                            
                                            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                                {userVlog.description}
                                            </p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                                    <FaMapMarkerAlt className="text-indigo-400" />
                                                    <span>{userVlog.location_name}</span>
                                                </div>
                                                
                                                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                                    <FaHeart className="text-red-500" />
                                                    <span>{userVlog.likeCount || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            
                            <div className="text-center mt-8">
                                <Link
                                    to={`/profile/${vlog.userRef?._id}`}
                                    className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium"
                                >
                                    <span>View All Adventures</span>
                                    <FaExternalLinkAlt />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
