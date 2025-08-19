const XLSX = require("xlsx");
const Expense = require("../models/expense.js");

// Add Expense Source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const { icon, category, amount, date, description } = req.body;
    // Validate required fields
    if(!category || !amount || !date) {
      return res.status(400).json({ message: "Source, amount, and date are required" });
    }
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date), // Ensure date is stored as a Date object
      description
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding Expense", error });
  }
}

// Get Expense Sources
exports.getExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const Expenses = await Expense.find({userId}).sort({ date: -1 });
    res.json(Expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Expense", error });
  }
}

// Download Expense Sources as Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const Expenses = await Expense.find({ userId }).sort({ date: -1 });

    // prepare data for Excel
    const data = Expenses.map(Expense => ({
      Date: Expense.date.toISOString().split('T')[0], // format date as YYYY-MM-DD
      Category: Expense.category,
      Description: Expense.description, 
      Amount: Expense.amount,
    }));
    // Create a new workbook and add the data
    const workBook = XLSX.utils.book_new();
    // Convert JSON data to a worksheet
    const workSheet = XLSX.utils.json_to_sheet(data);
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workBook, workSheet, "Expenses");
    // Write the workbook to a file and send it as a download
    XLSX.writeFile(workBook, "Expense_details.xlsx");
    // Set headers for download
    res.download("Expense_details.xlsx")

  } catch (error) {
    res.status(500).json({ message: "Error downloading Expense data", error });
  }
}

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
  
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense source deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Expense source", error });
  }
}