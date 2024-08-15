import React from 'react';
import styled from 'styled-components';

const ExpenseListContainer = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const ExpenseItem = styled.div`
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ExpenseTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const ExpenseDetail = styled.p`
  font-size: 14px;
  color: #888;
`;

const ExpenseList = ({ expenses = [] }) => {
  if (expenses.length === 0) {
    return <div>No expenses available</div>;
  }

  return (
    <ExpenseListContainer>
      {expenses.map((expense, index) => (
        <ExpenseItem key={index}>
          <ExpenseTitle>{expense.title}</ExpenseTitle>
          <ExpenseDetail>Amount: ${expense.amount}</ExpenseDetail>
        </ExpenseItem>
      ))}
    </ExpenseListContainer>
  );
};

export default ExpenseList;
