import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../charts/CustomBarChart.jsx'
import { prepareIncomeBarChartData } from '../../utils/helper.js'
const IncomeOverview = ({transactions, onAddIncome}) => {
  
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions)
    setChartData(result)

    return () => {}
  }, [transactions])
  return (
    <div className="card">
      <div className="flex items-center justify-between ">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-sm text-gray-500">
            Track all your incomes and analyse them easily
          </p>
        </div>

        <button className="btn-add" onClick={onAddIncome}>
          <LuPlus className="text-2xl " />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomBarChart 
          data={chartData}
        />
      </div>
    </div>
  );
}

export default IncomeOverview