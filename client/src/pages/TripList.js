import React, { useState, useEffect } from 'react';
import tripService from '../services/tripService';
import { Link } from 'react-router-dom';

const TripList = () => {
    const [trips, setTrips] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const { data } = await tripService.getTrips();
                setTrips(data);
            } catch (error) {
                setMessage('Error fetching trips.');
            }
        };
        fetchTrips();
    }, []);

    return (
        <div>
            <h2>My Trips</h2>
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

export default TripList;
