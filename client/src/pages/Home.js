import React, { useState, useEffect } from 'react';
import tripService from '../services/tripService';
import authService from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [trips, setTrips] = useState([]);
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = authService.getCurrentUser();
                if (user) {
                    setUserName(user.name);
                    const { data } = await tripService.getTrips();
                    setTrips(data);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                setMessage('Error fetching trips.');
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleCreateTrip = () => {
        navigate('/create-trip');
    };

    const handleJoinTrip = () => {
        navigate('/invite-to-trip');
    };

    return (
        <div>
            <h2>Welcome, {userName}</h2>
            <button onClick={handleCreateTrip}>Create Trip</button>
            <button onClick={handleJoinTrip}>Join Trip</button>
            <h3>My Trips</h3>
            {message && <p>{message}</p>}
            <ul>
                {trips.map((trip) => (
                    <li key={trip._id}>
                        <Link to={`/trip/${trip._id}`}>{trip.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
