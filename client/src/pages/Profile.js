import React, { useState, useEffect } from 'react';
import UserService from '../services/userService';

const Profile = () => {
 //   const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await UserService.getUserProfile();
      //          setUser(data);
                setName(data.name);
                setEmail(data.email);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { name, email, password };
            await UserService.updateUserProfile(updatedUser);
            setMessage('Profile updated successfully.');
        } catch (error) {
            setMessage('Error updating profile.');
        }
    };

    return (
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Update Profile</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Profile;
