import React from 'react'
import {
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart
} from 'recharts'


const CustomLineChart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FF00" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#00FF00" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strike="none" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#222" }}
          stroke="none"
        />
        <YAxis tick={{ fontSize: 12, fill: "#222" }} stroke="none" />

        <Area
          type="monotone"
          dataKey="Amount"
          stroke="#875cf5"
          fill="url(#incomeGradient)"
          strokeWidth={3}
          dot={{r: 3, fill:"#ab8df8"}}
        />

      </AreaChart>
    </ResponsiveContainer>
  );
}

export default CustomLineChart