// Import multer for handling file uploads
const multer = require("multer")

// Set up storage engine for multer
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: (req, file, cb) => {
    cb(null, "uploads/") // Directory to save uploaded files
  },
  // Set the filename for uploaded files (unique by using timestamp)
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname) // Unique filename
  },
})

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  // Allowed image MIME types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  // Check if the uploaded file's mimetype is in the allowedTypes array
  if (allowedTypes.includes(file.mimetype)) {
     cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false); // Reject the file
  }
}; 

// Create the multer upload instance with storage and file filter
const upload = multer({storage, fileFilter});

module.exports = upload