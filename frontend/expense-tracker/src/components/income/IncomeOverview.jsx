import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomLineChart from '../charts/CustomLineChart.jsx'
import { prepareIncomeLineChartData } from '../../utils/helper.js'
const IncomeOverview = ({transactions, onAddIncome}) => {
  
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions)
    setChartData(result)

    return () => {}
  }, [transactions])
  return (
    <div className="card mb-5">
      <div className="flex items-center justify-between ">
        <div className="">
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-sm text-gray-500">
            Track all your incomes and analyse them easily
          </p>
        </div>

        <button className="btn-add " onClick={onAddIncome}>
          <LuPlus className="text-xl " />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        <CustomLineChart 
          data={chartData}
        />
      </div>
    </div>
  );
}

export default IncomeOverview