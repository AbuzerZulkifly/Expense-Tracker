import React, { useState } from 'react'
import Input from '../inputs/Input.jsx'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup.jsx'

const AddExpenseForm = ({onAddExpense}) => {

    const [expense, setExpense] = useState({
      icon: '',
      date: '',
      category: '',
      description: '',
      amount: '',
    });

    const handleChange = (key, value) =>
      setExpense({
        ...expense,
        [key]: value,
      });
  return (
    <div>

      <EmojiPickerPopup 
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}

      />
      <Input
        value={expense.date}
        label="Spent On"
        type="date"
        onChange={({ target }) => handleChange("date", target.value)}
      />
      <Input
        value={expense.category}
        label="Expense Source"
        type="text"
        onChange={({ target }) => handleChange("category", target.value)}
      />
      <Input 
        value={expense.description}
        label="Description"
        type="text"
        onChange={({ target }) => handleChange("description", target.value)}
      />
      <Input 
        value={expense.amount}
        label="Amount"
        type="number"
        onChange={({ target }) => handleChange("amount", target.value)} />

        <div>
          <button className='w-full bg-primary py-1.5 rounded-lg'
          type="button"
          onClick={() => onAddExpense(expense)}
          >
            Add Expense
          </button>
        </div>
    </div>
  );
}

export default AddExpenseForm