import React, {useEffect, useState} from 'react'
import {prepareExpenseBarChartData} from '../../utils/helper.js'
import CustomBarChart from "../charts/CustomBarChart";

const Last30DaysExpenses = ({data}) => {
  
  const [chartData, setChartData] = useState([])
  
  useEffect(()=> {
    const result = prepareExpenseBarChartData(data)
    setChartData(result);
    return () => {}
  }, [data])
  console.log(data);
  
  return (
    
    <div className="card col-span-1">
      <div className="flext items-center justify-between">
        <h5 className="text-lg">Expenses of the last 30 days</h5>
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
}

export default Last30DaysExpenses