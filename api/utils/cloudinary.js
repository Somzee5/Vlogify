// api/utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your account credentials
cloudinary.config({
  cloud_name: 'dawspl3j6',
  api_key: '587638839735386',
  api_secret: 'N5mShgA_aXL-RgcwiiwLsRo0d_o',
});

export default cloudinary;
