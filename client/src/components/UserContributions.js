import React from 'react';
import styled from 'styled-components/native';

const ContributionContainer = styled.View`
  padding: 20px;
  background-color: #fff;
`;

const ContributionRow = styled.View`
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

const UserContributions = ({ totalPaid, totalOwed, totalReceived }) => {
  return (
    <ContributionContainer>
      <ContributionRow>
        <Label>Total Paid:</Label>
        <Value>${totalPaid}</Value>
      </ContributionRow>
      <ContributionRow>
        <Label>Total Owed:</Label>
        <Value>${totalOwed}</Value>
      </ContributionRow>
      <ContributionRow>
        <Label>Total Received:</Label>
        <Value>${totalReceived}</Value>
      </ContributionRow>
    </ContributionContainer>
  );
};

export default UserContributions;
