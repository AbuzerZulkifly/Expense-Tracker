const express = require("express");
const {
  addIncome,
  getIncome,
  downloadIncomeExcel,
  deleteIncome,
} = require("../controllers/incomeController.js");
const { isAuthenticated } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/addIncome", isAuthenticated, addIncome);
router.get("/getIncome", isAuthenticated, getIncome);
router.get("/downloadIncomeExcel", isAuthenticated, downloadIncomeExcel);
// :id is a placeholder for the income ID to be deleted.
router.delete("/:id", isAuthenticated, deleteIncome);

module.exports = router;