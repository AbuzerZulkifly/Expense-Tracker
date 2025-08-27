import React from 'react'
import moment from "moment"
import TransactionInfoCard from "../cards/TransactionInfoCard.jsx";
import { LuArrowRight } from "react-icons/lu";

const ExpenseTransaction = ({transactions, onSeeMore}) => {
  
  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className='text-lg'>Expenses</h5>

        <button className='btn-card' onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0,5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format('Do MMM YYYY')}
            amount={expense.amount}
            description={expense.description}
            type="Expense"
            hideDeleteBtn
          />


        ))}
      </div>
    </div>
  )
}

export default ExpenseTransaction