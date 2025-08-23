import React from 'react'
import { LuArrowRight } from "react-icons/lu";
import moment from 'moment'
import TransactionInfoCard from "../cards/TransactionInfoCard.jsx";

const RecentTransaction = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
      <div className="flex items-center justify-between">
        <h5 className='text-xl'>Recent Transactions</h5>
        <button className='btn-card' onClick={onSeeMore}>
          See All Transactions <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6 ">
        {transactions?.slice(0,5)?.map((item) => ( 
          <TransactionInfoCard
            key={item._id}
            icon={item.icon}
            title={item.type == "expense" ? item.category : item.source}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={item.type}
            description={item.description}
            hideDeleteBtn 
           />
        ))}
      </div>
      
    </div>
  )
}

export default RecentTransaction