import React, { useState } from 'react';
import groupService from '../services/groupService';

const InviteMember = () => {
    const [groupId, setGroupId] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleInviteMember = async (e) => {
        e.preventDefault();
        try {
            await groupService.inviteMember(groupId, email);
            setMessage('Member invited successfully.');
        } catch (error) {
            setMessage('Error inviting member.');
        }
    };

    return (
        <div>
            <h2>Invite Member</h2>
            <form onSubmit={handleInviteMember}>
                <input
                    type="text"
                    placeholder="Group ID"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Invite Member</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default InviteMember;
