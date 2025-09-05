
import React, {use, useEffect, useState} from 'react'
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#875cf5", "#cfbefb", "#ff7eb3", "#ff65a3", "#ff4d8f", "#ff2e6d", "#ff1744", "#ff0033"]
const RecentIncomeWithChart = ({data, totalIncome}) => {

  const [chartData, setChartData] = useState([])

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount
    }))
    setChartData(dataArr)
  }

  useEffect(()=> {
    prepareChartData();
    return () => {}
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-bold">Income for the last 60 days</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`LKR ${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      ></CustomPieChart>
    </div>
  );
}

export default RecentIncomeWithChart