import React from 'react'
import CustomPieChart from '../charts/CustomPieChart.jsx';

const FinanceOverview = ({ totalBalance, totalExpense, totalIncome }) => {
  
  const COLORS = ['#0080FF', '#8B0000', '#00FF80']
  const balanceData = [
    {name: "Total Balance", amount: totalBalance},
    {name: "Total Expense", amount: totalExpense},
    {name: "Total Income", amount: totalIncome}
  ]
  return (
  <div className='card'>
    <div className='flex items-center justify-between'>
      <h5 className="text-lg font-bold">Financial Overview</h5>
    </div>

    <CustomPieChart 
      data={balanceData}
      label="Total Balance"
      totalAmount={`LKR ${totalBalance}`}
      colors={COLORS}
      showTextAnchor
    />

  </div>
  )
};

export default FinanceOverview