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
  return (
    <div className= "group relative font-bold flex flex-col border border-violet-800 gap-5 mt-2 p-2 rounded-xl hover:bg-gray-200/50">

      <div className="flex font-bold justify-between gap-4 items-center">
        <p>{type === "income" ? "Income" : "Expense"}</p>
        <p>{date}</p>
      </div>

      <div className="flex items-center gap-4">
      <div className='flex gap-5 items-center'>
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-full">
          {icon ? (
            <img src={icon} alt={title} className="w-6 h-6" />
          ) : (
            <LuUtensils />
          )}
        </div>

        <div className="">
          <p className="">{title}</p>
          <p className="">{description}</p>
        </div>
      </div>
        
        <div className="">
          {!hideDeleteBtn && (
            <button className="" onClick={onDelete}>
              <LuTrash2 size={18} />
            </button>
          )}

          <div className="flex items-center justify-between px-3 py-2 gap-2">
            <h6 className="">
              {type === "income" ? "+" : "-"} LKR{amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionInfoCard