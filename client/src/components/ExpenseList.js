// src/components/ExpenseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseList = ({ tripId }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`/api/expenses/trip/${tripId}`).then(res => setExpenses(res.data))
    .catch(err => console.error(err));
    
  }, [tripId]);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            {expense.description} - ${expense.amount} - {expense.splitOption}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
