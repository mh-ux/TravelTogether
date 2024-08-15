import React from 'react';
import { View } from 'react-native';
import ProjectedCosts from './ProjectedCosts';
import ExpenseList from './ExpenseList';
import AddItemButton from './AddItemButton';
import UserContributions from './UserContributions';

const BudgetForecastPage = ({ forecastData, expenses, onAddExpense }) => {
  return (
    <View>
      <ProjectedCosts 
        userProjectedCost={forecastData.userProjectedCost}
        totalProjectedCost={forecastData.totalProjectedCost}
      />
      <ExpenseList expenses={expenses} />
      <UserContributions 
        totalPaid={forecastData.totalPaid}
        totalOwed={forecastData.totalOwed}
        totalReceived={forecastData.totalReceived}
      />
      <AddItemButton onPress={onAddExpense} />
    </View>
  );
};

export default BudgetForecastPage;