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
            <strong>{expense.title}</strong> - ${expense.amount} <br/>
            <small>Date: {expense.date}</small> <br/>
            <small>Payer: {expense.payer.name}</small> <br/>
            <small>Category: {expense.category}</small> <br/>
            <small>Split: {expense.splitOption}</small>
            <ul>
              {expense.splitBetween.map((split, index) => (
                <li key={index}>
                  {split.user.name} - ${split.amount}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
