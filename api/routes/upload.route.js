import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';



const router = express.Router();
 
// Configure Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vlogify', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png'], // Allowed image formats
    resource_type: 'image', // Upload images only
  },
});

const upload = multer({ storage });

// Route to upload image
router.post('/upload', upload.single('image'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Image uploaded successfully',
    imageUrl: req.file.path, // Cloudinary URL for the uploaded file
  });
});

export default router;
 