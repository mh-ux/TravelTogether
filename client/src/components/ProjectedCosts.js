import React from 'react';
import styled from 'styled-components/native';

const SummaryContainer = styled.View`
  padding: 20px;
  background-color: #fff;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: #333;
`;

const Value = styled.Text`
  font-size: 16px;
  color: #FF6F61;
`;

const ProjectedCosts = ({ userProjectedCost, totalProjectedCost }) => {
  return (
    <SummaryContainer>
      <SummaryRow>
        <Label>Projected Cost for You:</Label>
        <Value>${userProjectedCost}</Value>
      </SummaryRow>
      <SummaryRow>
        <Label>Projected Trip Spend:</Label>
        <Value>${totalProjectedCost}</Value>
      </SummaryRow>
    </SummaryContainer>
  );
};

export default ProjectedCosts;
