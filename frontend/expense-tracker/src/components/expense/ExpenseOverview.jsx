import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper.js'
import CustomLineChart from '../charts/CustomLineChart.jsx'

const ExpenseOverview = ({transactions, onAddExpense}) => {
 
   const [chartData, setChartData] = useState([])
 
   useEffect(() => {
     const result = prepareExpenseLineChartData(transactions)
     setChartData(result)
 
     return () => {}
   }, [transactions])
  return (
       <div className="card mb-5">
      <div className="flex items-center justify-between ">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-sm text-gray-500">
            Track all your Expense and analyse them easily
          </p>
        </div>

        <button className="btn-add " onClick={onAddExpense}>
          <LuPlus className="text-xl " />
          Add Expense
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart 
          data={chartData}
        />
      </div>
    </div>
  )
}

export default ExpenseOverview