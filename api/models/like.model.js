import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    vlogId: {
      type: String,
      required: true,
      ref: 'Vlog'
    },
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Compound index to ensure a user can only like a vlog once
likeSchema.index({ vlogId: 1, userId: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

export default Like;
