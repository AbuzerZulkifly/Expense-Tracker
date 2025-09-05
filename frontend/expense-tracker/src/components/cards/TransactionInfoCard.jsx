import React, { useState } from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown, LuTrash2 } from "react-icons/lu";
const TransactionInfoCard = ({
icon,
title,
description,
date,
amount,
type,
hideDeleteBtn,
onDelete}) => {

const [showBox, setShowBox ] = useState(false)

  const incomeExpenseStyle = (incomeBg, expenseBg, incomeText, expenseText) => {
   return type === "income"
     ? `bg-green-${incomeBg} text-green-${incomeText}`
     : `bg-red-${expenseBg} text-red-${expenseText}`;
  };
  return (
    <div className="group md:border-1 md:border-gray-400 md:px-2 md:rounded-lg tablet-transactionInfoCard phone-transactionInfoCard xs-phone-transactionInfoCard text-sm flex flex-col gap-3 mt-2 border-b-2 py-1 ">
      <div className="flex font-semibold items-center justify-between">
        <div className="flex  xs:gap-3 md:gap-3 items-center ">
          <div className="w-12 h-12 sm:w-9 sm:h-9 xs:w-6 xs:h-6 flex items-center justify-center text-xl md:text-sm text-gray-800 bg-gray-200 rounded-full">
            {icon ? (
              <img src={icon} alt={title} className="w-10 h-10" />
            ) : (
              <LuUtensils />
            )}
          </div>
          <p
            className={`${incomeExpenseStyle(400, 500)} px-1 py-1 rounded-lg `}
          >
            {type === "income" ? "Income" : "Expense"}
          </p>
          <p className="bg-violet-400 px-1 py-1 rounded-lg">{title}</p>
        </div>

        <div className="flex items-center md:gap-5 gap-2">
          <p>{date}</p>
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-75"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="overflow-hidden font-medium text-pretty">
          <p className="sm:w-[290px] md:w-[230px] lg:w-[335px] xs:w-[220px]">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center gap-5">
          <div>
            <div
              className={`flex items-center py-2 gap-2 ${incomeExpenseStyle(
                0,
                0,
                500,
                500
              )}`}
            >
              <h6 className={`font-bold`}>
                {type === "income" ? "+" : "-"} LKR {amount}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfoCard