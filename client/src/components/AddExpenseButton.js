import React from 'react';
import styled from 'styled-components/native';

const AddButtonContainer = styled.TouchableOpacity`
  padding: 15px;
  background-color: #FF6F61;
  border-radius: 20px;
  align-items: center;
  margin-top: 20px;
`;

const AddButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const AddItemButton = ({ onPress }) => {
  return (
    <AddButtonContainer onPress={onPress}>
      <AddButtonText>+ Add Item</AddButtonText>
    </AddButtonContainer>
  );
};

export default AddItemButton;
