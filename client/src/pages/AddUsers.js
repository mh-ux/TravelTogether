import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddUsers = () => {
    const { tripId } = useParams();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No auth token found');
            }

            await axios.post(`http://localhost:5000/api/trips/${tripId}/add-user`, { email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate(`/trip/${tripId}`);
        } catch (error) {
            console.error('Error adding user:', error);
            setError('Error adding user. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add Users to Trip</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleAddUser}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUsers;
