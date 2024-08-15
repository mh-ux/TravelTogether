import React from 'react';
import styled from 'styled-components/native';

const BillContainer = styled.ScrollView`
  padding: 20px;
  background-color: #fff;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FF6F61;
  margin-bottom: 10px;
`;

const ExpenseList = styled.View`
  margin-bottom: 20px;
`;

const ExpenseItem = styled.View`
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
`;

const ExpenseTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ExpenseDetail = styled.Text`
  font-size: 14px;
  color: #888;
`;

const AddItemButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: #FF6F61;
  border-radius: 20px;
  align-items: center;
  margin-top: 20px;
`;

const BillSplitting = ({ expenses }) => {
  return (
    <BillContainer>
      <SectionTitle>Bill Splitting</SectionTitle>
      <ExpenseList>
        {expenses.map((expense, index) => (
          <ExpenseItem key={index}>
            <ExpenseTitle>{expense.title}</ExpenseTitle>
            <ExpenseDetail>Total: ${expense.amount} | Your share: ${expense.yourShare}</ExpenseDetail>
          </ExpenseItem>
        ))}
      </ExpenseList>

      <AddItemButton>
        <SectionTitle style={{ color: 'white' }}>+ Add Item</SectionTitle>
      </AddItemButton>
    </BillContainer>
  );
};

export default BillSplitting;
