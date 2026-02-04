
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // 1. Determine Resource Type
    let resourceType = 'auto'; 
    if (file.mimetype === 'application/pdf') resourceType = 'raw'; // 'raw' prevents PDF from being treated as an image

    // 2. Determine Format (Extension)
    let format = undefined;
    if (file.mimetype === 'application/pdf') format = 'pdf';
    else if (file.mimetype === 'audio/mpeg') format = 'mp3';
    else if (file.mimetype === 'audio/wav') format = 'wav';
    
    return {
      folder: 'crime_reporting_chat',
      resource_type: resourceType,
      format: format, // ✅ Force the correct extension
      public_id: `${file.fieldname}-${Date.now()}`, 
      // Ensure we keep original extension if format isn't manually set
      use_filename: true, 
      unique_filename: true,
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;