const XLSX = require("xlsx");
const Income = require("../models/income.js");

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const { icon, source, amount, date, description } = req.body;
    // Validate required fields
    if(!source || !amount || !date) {
      return res.status(400).json({ message: "Source, amount, and date are required" });
    }
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date), // Ensure date is stored as a Date object
      description
    });

    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ message: "Error adding income", error });
  }
}

// Get Income Sources
exports.getIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({userId}).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching income", error });
  }
}

// Download Income Sources as Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    // prepare data for Excel
    const data = incomes.map(income => ({
      Date: income.date.toISOString().split('T')[0], // format date as YYYY-MM-DD
      Source: income.source,
      description: income.description, 
      Amount: income.amount,
    }));
    // Create a new workbook and add the data
    const workBook = XLSX.utils.book_new();
    // Convert JSON data to a worksheet
    const workSheet = XLSX.utils.json_to_sheet(data);
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workBook, workSheet, "Incomes");
    // Write the workbook to a file and send it as a download
    XLSX.writeFile(workBook, "Income_details.xlsx");
    // Set headers for download
    res.download("Income_details.xlsx")

  } catch (error) {
    res.status(500).json({ message: "Error downloading income data", error });
  }
}

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income source deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting income source", error });
  }
}