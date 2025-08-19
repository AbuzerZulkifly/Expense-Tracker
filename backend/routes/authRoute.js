const express = require("express")
const { protect } = require("../middleware/authMiddleware.js");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require ("../contollers/authController.js");
const upload = require("../middleware/uploadMiddleware.js");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser", protect, getUserInfo)

// Define a POST route for uploading a single image file with the field name "image"
router.post("/upload-image", upload.single("image"), (req, res) => {
  // Check if a file was uploaded
  if(!req.file) {
    // If not, respond with an error message
    return res.status(400).json({ message: "No file uploaded" });
  }
  // Construct the URL for the uploaded image
  const imgUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imgUrl})
});

module.exports = router;