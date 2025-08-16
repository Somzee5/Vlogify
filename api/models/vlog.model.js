import mongoose from 'mongoose';

const vlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location_name: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
    },
    latitude: {
      type: Number,
      required: false, // Optional
    },
    longitude: {
      type: Number,
      required: false, // Optional
    },
    cost_estimate: {
      type: String,
      required: false, // Optional
    },
    best_time_to_visit: {
      type: String,
      required: false, // Optional
    },
    reviews: {
      type: String,
      required: false, // Optional
    },
    instagram_reel_link: {
      type: String,
      required: false, // Optional
    },
    youtube_video_link: {
      type: String,
      required: false, // Optional
    },
    imageURL: {
      type: Array, // To store image URLs or paths
      required: false, // Optional
    },
    tags: {
      type: [String],
      required: false, // Optional
    }, 
    userRef: {
        type: String,
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
        min: 0
    },
  },
  { timestamps: true }
);

const Vlog = mongoose.model('Vlog', vlogSchema);

export default Vlog;
