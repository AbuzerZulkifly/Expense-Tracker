import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";
const TransactionInfoCard = ({
icon,
title,
description,
date,
amount,
type,
hideDeleteBtn}) => {

  const incomeExpenseStyle = (incomeBg, expenseBg, incomeText, expenseText) => {
   return type === "income"
     ? `bg-green-${incomeBg} text-green-${incomeText}`
     : `bg-red-${expenseBg} text-red-${expenseText}`;
  };
  return (
    <div className= "group relative font-bold flex flex-col  gap-3 mt-2 p-2 py-6 border-b-2 border-gray-500 hover:bg-gray-200/50">

      <div className="flex font-semibold justify-between gap-4 items-center">
        <div className='flex items-center gap-4'>
        <p className={`${incomeExpenseStyle(400, 500)} px-2 py-1 rounded-lg `}>{type === "income" ? "Income" : "Expense"}</p>
        <p className="bg-violet-400 px-2 py-1 rounded-lg">{title}</p>
        </div>
        <p>{date}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
      <div className='flex gap-5 items-center'>
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-full">
          {icon ? (
            <img src={icon} alt={title} className="w-6 h-6" />
          ) : (
            <LuUtensils />
          )}
        </div>

        <div className="">
          <p className="">{description}</p>
        </div>
      </div>
        
        <div className="">
          {!hideDeleteBtn && (
            <button className="" onClick={onDelete}>
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={`flex items-center justify-end  py-2 gap-2 ${incomeExpenseStyle(0,0, 500, 500)}`}>
            <h6 className={``}>
              {type === "income" ? "+" : "-"} LKR {amount}
            </h6>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfoCard