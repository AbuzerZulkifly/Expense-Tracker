const express = require("express");
const {
  addExpense,
  getExpense,
  downloadExpenseExcel,
  deleteExpense,
} = require("../controllers/expenseController.js");
const { isAuthenticated } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/addExpense", isAuthenticated, addExpense);
router.get("/getExpense", isAuthenticated, getExpense);
router.get("/downloadExpenseExcel", isAuthenticated, downloadExpenseExcel);
// :id is a placeholder for the income ID to be deleted.
router.delete("/:id", isAuthenticated, deleteExpense);

module.exports = router;