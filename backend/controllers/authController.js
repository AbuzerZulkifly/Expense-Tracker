const jwt = require("jsonwebtoken");
const User = require('../models/user.js')

// Generate web token
const generateToken = (id) => {
  return jwt.sign ( {
    id
  }, process.env.JWT_SECRET, { expiresIn: "24h" });
}

// Register User
exports.registerUser = async (req, res ) => {
  const {fullName, email, password, profilePic} = req.body
  
  // Validation, check for missing fields
  if(!fullName || !email || !password) {
    return res.status (400).json({message: "Please fill all the fields"})
  }

  try {
    // Check if email exists already
    const existingUser = await User.findOne({email})
    if (existingUser) {
      return res.status(400).json({message: "This email id already exists"});
    }

    // Creating the user

    const user = await User.create({
      fullName,
      email,
      password,
      profilePic
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Ooops something went wrong when creating your account", error: error.message
    })
  }
} 

// Login User
exports.loginUser = async (req, res ) => {
  const {email, password} = req.body;
  // Validation, check for missing fields
  if(!email || !password) {
    return res.status (400).json({message: "Please fill all the fields"})
  }
  try {
    // Check if user exists
    const user = await User.findOne({email});
    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({message: "The email or password is incorrect"});
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    })
  } 
  catch(error){
    return res.status(500).json({
      message: "Ooops something went wrong when logging in", error: error.message
    })
  }
} 

// get User Info 
exports.getUserInfo = async (req, res ) => {
  try {
    const user = await User.find({email: req.user.email}).select("-password");
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Ooops something went wrong when fetching user info", error: error.message
    });
  }
} 