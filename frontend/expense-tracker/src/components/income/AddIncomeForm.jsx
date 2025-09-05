import React, { useState } from 'react'
import Input from '../inputs/Input.jsx'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup.jsx'

const AddIncomeForm = ({onAddIncome}) => {

    const [income, setIncome] = useState({
      icon: '',
      date: '',
      source: '',
      description: '',
      amount: '',
    });

    const handleChange = (key, value) =>
      setIncome({
        ...income,
        [key]: value,
      });
  return (
    <div>

      <EmojiPickerPopup 
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        className="text-center"

      />
      <Input
        value={income.date}
        label="Received On"
        type="date"
        onChange={({ target }) => handleChange("date", target.value)}
      />
      <Input
        value={income.source}
        label="Source of Income"
        type="text"
        onChange={({ target }) => handleChange("source", target.value)}
      />
      <Input 
        value={income.description}
        label="Description"
        type="text"
        onChange={({ target }) => handleChange("description", target.value)}
      />
      <Input 
        value={income.amount}
        label="Amount"
        type="number"
        onChange={({ target }) => handleChange("amount", target.value)} />

        <div>
          <button className='w-full bg-primary py-1.5 rounded-lg'
          type="button"
          onClick={() => onAddIncome(income)}
          >
            Add Income
          </button>
        </div>
    </div>
  );
}

export default AddIncomeForm