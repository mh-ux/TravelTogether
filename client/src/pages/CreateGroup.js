import React, { useState } from 'react';
import groupService from '../services/groupService';

const CreateGroup = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            await groupService.CreateGroup(name, description);
            setMessage('Group created successfully.');
        } catch (error) {
            setMessage('Error creating group.');
        }
    };

    return (
        <div>
            <h2>Create Group</h2>
            <form onSubmit={handleCreateGroup}>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Group Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create Group</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateGroup;
