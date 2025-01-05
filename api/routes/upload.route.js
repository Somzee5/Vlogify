import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const router = express.Router();

// Configure Multer storage with Cloudinary for single and multiple uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vlogify', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed image formats
    resource_type: 'image', // Upload images only
  },
});

const upload = multer({ storage });

// Route for single image upload (existing route)
router.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    imageUrl: req.file.path, // Cloudinary URL for the uploaded file
  });
});

// Route for multiple image uploads (new route)
router.post('/upload/multiple', upload.array('images', 5), (req, res) => {
  console.log("Received files:", req.files);  // Add this line for debugging
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'No images provided',
    });
  }

  const imageUrls = req.files.map((file) => file.path); // Get URLs of uploaded images
  console.log("Uploaded image URLs:", imageUrls);  // Log the image URLs for debugging

  res.status(200).json({
    success: true,
    message: 'Images uploaded successfully',
    imageUrls, // Cloudinary URLs for the uploaded files
  });
});


export default router;
