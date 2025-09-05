import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../cards/TransactionInfoCard.jsx'
import moment from 'moment'
import FilterDate from '../FilterDate.jsx'

const ExpenseList = ({transactions, onDelete, onDownload, 
  filterStartDate,
  filterEndDate,
  onStartDateChange,
  onEndDateChange}) => {  
  return (
    <div className="card">
      <div className='flex items-center justify-between mb-4'>
        <h5 className="text-xl text-center font-bold">
          Expense Sources
        </h5>
        <button className="btn-card" onClick={onDownload}>
          <LuDownload className='text-base' /> Download Excel
        </button>
        </div>
      <div className="flex items-center">
      
      <FilterDate 
          startDate={filterStartDate}
          endDate={filterEndDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />  
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        
        {transactions.map((expense) =>( 
          <TransactionInfoCard 
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("DD MMM, YYYY")}
            description={expense.description}
            amount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseList