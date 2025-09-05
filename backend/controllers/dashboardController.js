const Income = require('../models/income.js');
const Expense = require('../models/expense.js');
const {isValidObjectId, Types} = require('mongoose');

// Get Dashboard Data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
    
    console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Get Income transaction for the last 60 days
    const lastAnnumIncomeTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      }
    }).sort({date: -1});
  
    //  Get total Income for the last 60 days
    const lastAnnumIncome = lastAnnumIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Get Expense transaction for the last 30 days
    const lastAnnumExpenseTransactions = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    }).sort({date: -1});
    // Get total Expense for the last 30 days
    const lastAnnumExpense = lastAnnumExpenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  
    // Fetch last 10 income and expense transactions
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(10)).map(
        (transaction) => ({...transaction.toObject(),
          ...transaction.toObject(),
          type: 'income',})

      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(10)).map(
        (transaction) => ({...transaction.toObject(),
          ...transaction.toObject(),
          type: 'expense',})
      )
    ].sort((a, b) => b.date - a.date);

    // Final response object
    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: lastAnnumExpense,
        transactions: lastAnnumExpenseTransactions
      },
      last60DaysIncome: {
        total: lastAnnumIncome,
        transactions: lastAnnumIncomeTransactions
      },
      lastTransactions: lastTransactions.slice(0, 10),
     
    })
  
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching dashboard data', error})
  }
}