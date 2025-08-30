const express = require("express")
const { isAuthenticated } = require("../middleware/authMiddleware.js");
const { isAdmin } = require("../middleware/adminMiddleware.js");
const { getAllUsers, deleteUser, updateUserStatus } = require("../controllers/adminController.js");

// adminRoute.js
const router = express.Router();
router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.delete("/users/:id", isAuthenticated, isAdmin, deleteUser);
router.patch("/users/:id/status", isAuthenticated, isAdmin, updateUserStatus);

module.exports = router;