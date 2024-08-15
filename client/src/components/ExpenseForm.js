import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ tripId }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('general');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState('');
  const [splitBetween, setSplitBetween] = useState([]);  // Used here
  const [users, setUsers] = useState([]);  // Used here
  const [splitOption, setSplitOption] = useState('equally');
  const [reimbursement, setReimbursement] = useState(false);
  const [notes, setNotes] = useState('');
  const [splitDetails, setSplitDetails] = useState([]);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    // Fetch groupId using tripId
    const fetchGroupId = async () => {
      try {
        const response = await axios.get(`/api/trips/${tripId}/group`);
        setGroupId(response.data.groupId);
      } catch (error) {
        console.error('Error fetching groupId:', error);
      }
    };
    fetchGroupId();
  }, [tripId]);

  useEffect(() => {
    if (groupId) {
      // Fetch users using groupId
      axios.get(`/api/groups/${groupId}/users`)
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }
  }, [groupId]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expense = { title, date, category, amount, payer, splitBetween: splitDetails, splitOption, reimbursement, notes, tripId };
      await axios.post('/api/expenses', expense);
      alert('Expense added successfully');
    } catch (error) {
      alert('Error adding expense');
    }
  };

  const handleSplitChange = (index, value) => {
    const updatedDetails = [...splitDetails];
    updatedDetails[index] = { ...updatedDetails[index], amount: value };
    setSplitDetails(updatedDetails);
  };

  const handleSplitOptionChange = (option) => {
    setSplitOption(option);

    if (option === 'equally') {
      const equalSplit = splitBetween.map(user => ({ user, amount: amount / splitBetween.length }));
      setSplitDetails(equalSplit);
    } else {
      const unequalSplit = splitBetween.map(user => ({ user, amount: 0 }));
      setSplitDetails(unequalSplit);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Expense Title" required />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <select value={category} onChange={e => setCategory(e.target.value)} required>
        {/* Category options here */}
      </select>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
      <label>
        <input type="checkbox" checked={reimbursement} onChange={() => setReimbursement(!reimbursement)} />
        Reimbursement
      </label>
      <select value={payer} onChange={e => setPayer(e.target.value)} required>
        <option value="">Select Payer</option>
        {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
      </select>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes" />
      <div>
        <label>
          <input type="radio" value="equally" checked={splitOption === 'equally'} onChange={() => handleSplitOptionChange('equally')} />
          Split Equally
        </label>
        <label>
          <input type="radio" value="unequally" checked={splitOption === 'unequally'} onChange={() => handleSplitOptionChange('unequally')} />
          Split Unequally
        </label>
      </div>
      {splitOption === 'unequally' && splitBetween.map((userId, index) => (
        <div key={userId}>
          <label>{users.find(user => user._id === userId)?.name}</label>
          <input
            type="number"
            value={splitDetails[index]?.amount || 0}
            onChange={e => handleSplitChange(index, e.target.value)}
            placeholder="Amount"
          />
        </div>
      ))}
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
