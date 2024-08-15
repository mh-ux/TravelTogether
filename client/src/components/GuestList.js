import React, { useState } from 'react';
import styled from 'styled-components/native';

const GuestListContainer = styled.ScrollView`
  padding: 20px;
  background-color: #fff;
`;

const GuestItem = styled.View`
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  margin-bottom: 15px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
`;

const GuestName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const GuestDetail = styled.Text`
  font-size: 14px;
  color: #888;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const EditButton = styled.TouchableOpacity`
  padding: 5px;
  background-color: #4CAF50;
  border-radius: 10px;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 5px;
  background-color: #FF6F61;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

const AddGuestForm = styled.View`
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const InputField = styled.TextInput`
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  margin-bottom: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #FF6F61;
  border-radius: 10px;
  align-items: center;
`;

const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

const GuestList = () => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ name: '', contact: '', rsvp: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddGuest = () => {
    if (isEditing) {
      handleEditGuest(editingIndex, newGuest);
    } else {
      setGuests([...guests, newGuest]);
    }
    setNewGuest({ name: '', contact: '', rsvp: '' });
    setIsEditing(false);
  };

  const handleEditGuest = (index, updatedGuest) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = updatedGuest;
    setGuests(updatedGuests);
    setIsEditing(false);
    setEditingIndex(null);
  };

  const handleRemoveGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const handleEditButtonClick = (index) => {
    setNewGuest(guests[index]);
    setIsEditing(true);
    setEditingIndex(index);
  };

  return (
    <GuestListContainer>
      {guests.map((guest, index) => (
        <GuestItem key={index}>
          <GuestName>{guest.name}</GuestName>
          <GuestDetail>Contact: {guest.contact}</GuestDetail>
          <GuestDetail>RSVP: {guest.rsvp}</GuestDetail>
          <ButtonContainer>
            <EditButton onPress={() => handleEditButtonClick(index)}>
              <ButtonText>Edit</ButtonText>
            </EditButton>
            <RemoveButton onPress={() => handleRemoveGuest(index)}>
              <ButtonText>Remove</ButtonText>
            </RemoveButton>
          </ButtonContainer>
        </GuestItem>
      ))}

      <AddGuestForm>
        <InputField
          placeholder="Guest Name"
          value={newGuest.name}
          onChangeText={(text) => setNewGuest({ ...newGuest, name: text })}
        />
        <InputField
          placeholder="Contact Information"
          value={newGuest.contact}
          onChangeText={(text) => setNewGuest({ ...newGuest, contact: text })}
        />
        <InputField
          placeholder="RSVP Status"
          value={newGuest.rsvp}
          onChangeText={(text) => setNewGuest({ ...newGuest, rsvp: text })}
        />
        <SubmitButton onPress={handleAddGuest}>
          <SubmitButtonText>{isEditing ? 'Update Guest' : 'Add Guest'}</SubmitButtonText>
        </SubmitButton>
      </AddGuestForm>
    </GuestListContainer>
  );
};

export default GuestList;
