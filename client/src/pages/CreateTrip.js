import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tripService from '../services/tripService';

const CreateTrip = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [groupId, setGroupId] = useState('');
    const navigate = useNavigate();

    const handleCreateTrip = async (e) => {
        e.preventDefault();
        try {
            const tripData = { title, description, startDate, endDate, groupId: groupId || null };
            const response = await tripService.createTrip(tripData);
            navigate(`/trip/${response.data._id}`);
        } catch (error) {
            console.error('Error creating trip:', error);
        }
    };

    return (
        <div>
            <h2>Create Trip</h2>
            <form onSubmit={handleCreateTrip}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Group (Optional)</label>
                    <input
                        type="text"
                        placeholder="Group ID"
                        value={groupId}
                        onChange={(e) => setGroupId(e.target.value)}
                    />
                </div>
                <button type="submit">Create Trip</button>
            </form>
        </div>
    );
};

export default CreateTrip;
