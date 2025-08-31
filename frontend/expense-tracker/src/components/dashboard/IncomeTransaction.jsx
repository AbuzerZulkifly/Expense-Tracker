import React from 'react'
import moment from "moment"
import TransactionInfoCard from "../cards/TransactionInfoCard.jsx";
import { LuArrowRight } from "react-icons/lu";

const IncomeTransaction = ({transactions, onSeeMore}) => {
  
  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className='text-lg'>Incomes</h5>

        <button className='btn-card' onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0,5)?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format('Do MMM YYYY')}
            amount={income.amount}
            description={income.description}
            type="income"
            hideDeleteBtn
          />


        ))}
      </div>
    </div>
  )
}

export default IncomeTransaction