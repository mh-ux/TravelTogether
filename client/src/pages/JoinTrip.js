import React, { useState, useEffect } from 'react';
import tripService from '../services/tripService';
import { useParams } from 'react-router-dom';

const JoinTrip = ({ match, location }) => {
    const [message, setMessage] = useState('');
    const { tripId } = useParams(); // useParams hook to get route parameters
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const joinTrip = async () => {
            try {
                const response = await tripService.getTripById(tripId);
                setTrip(response.data);
                setLoading(false);
                setMessage('Joined trip successfully.');
            } catch (error) {
                setMessage('Error joining trip.');
            }
        };
        joinTrip();
    }, [tripId]);

    return (
        <div>
            <h2>Join Trip</h2>
            {message && <p>{message}</p>}
        </div>
    );
};

export default JoinTrip;
