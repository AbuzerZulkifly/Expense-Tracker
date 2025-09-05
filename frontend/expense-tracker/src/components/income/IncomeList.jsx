import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard.jsx'
import moment from 'moment'
import FilterDate from '../FilterDate.jsx'
const IncomeList = ({transactions, onDelete, onDownload,  filterStartDate,
  filterEndDate,
  onStartDateChange,
  onEndDateChange}) => {
  
  
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">
          Income Sources
        </h5>
        <button className="btn-card" onClick={onDownload}>
          <LuDownload className='text-base' /> Download Excel
        </button>
      </div>
        <FilterDate 
          startDate={filterStartDate}
          endDate={filterEndDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {transactions.map((income) =>( 
          <TransactionInfoCard 
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("DD MMM, YYYY")}
            description={income.description}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default IncomeList