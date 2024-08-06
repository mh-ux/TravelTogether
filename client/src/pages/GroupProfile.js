import React, { useState, useEffect } from 'react';
import groupService from '../services/groupService';
import { useParams } from 'react-router-dom';

const GroupProfile = ({ match }) => {
    const { groupId } = useParams(); //
    const [group, setGroup] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const { data } = await groupService.getGroup(groupId);
                setGroup(data);
            } catch (error) {
                setMessage('Error fetching group.');
            }
        };
        fetchGroup();
    }, 
    [groupId]);


    if (!group) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Group Profile</h2>
            {message && <p>{message}</p>}
            {group && (
                <div>
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <h4>Members</h4>
                    <ul>
                        {group.members &&
                            group.members.map((member) => (
                                <li key={member.user._id}>
                                    {member.user.name} ({member.role})
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GroupProfile;
