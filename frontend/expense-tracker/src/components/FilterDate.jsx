import React, { useState } from 'react'
import Input from './inputs/Input.jsx'

const FilterDate = ({startDate, endDate, onStartDateChange, onEndDateChange}) => {

  return (
    <div className="mt-3 flex gap-3 items-center">
      <Input
        type="date"
        label="Start Date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        className="border rounded px-2 py-1"
        placeholder="Start Date"
      />
      -
      <Input
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        className="border rounded px-2 py-1"
        label="End Date"
      />
    </div>
  );
}

export default FilterDate