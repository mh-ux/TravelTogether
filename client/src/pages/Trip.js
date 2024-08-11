import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isTokenExpired } from '../utils/authUtils'; // Import the utility function
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const Trip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTrip, setUpdatedTrip] = useState({});
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token || isTokenExpired(token)) {
                    localStorage.removeItem('authToken');
                    navigate('/login');
                    throw new Error('Token is expired or missing');
                }
                
                const response = await axios.get(`http://localhost:5000/api/trips/${tripId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTrip(response.data);
                setUpdatedTrip(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trip:', error);
                setError(error.message || 'Error fetching trip');
                setLoading(false);
            }
        };

        fetchTrip();
    }, [tripId, navigate]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTrip({ ...updatedTrip, [name]: value });
    };

    const handleUpdateTrip = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem('authToken');
                navigate('/login');
                throw new Error('Token is expired or missing');
            }

            await axios.put(`http://localhost:5000/api/trips/${tripId}`, updatedTrip, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTrip(updatedTrip);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating trip:', error);
            setError(error.message || 'Error updating trip');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!trip) {
        return <div>Trip not found</div>;
    }

    return (
        <div>
            <h1>{trip.title}</h1>
            <p>Organized by: {trip.creator?.name}</p>
            <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(trip.endDate).toLocaleDateString()}</p>
            <p>Description: {trip.description}</p>
            <p>Group: {trip.group?.name}</p>
            <h3>Users</h3>
            <ul>
                {trip.members.map(member => (
                    <li key={member._id}>{member.name}</li>
                ))}
            </ul>
            <button onClick={() => navigate(`/add-users/${tripId}`)}>Add Users</button>

            <div>
      <h1>{trip.name} Details</h1>
      <p>Total Spent: ${trip.totalSpent}</p>
      <p>Total Received: ${trip.totalReceived}</p>

      <h2>User Balances</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - Spent: ${user.totalSpent} | Received: ${user.totalReceived}
          </li>
        ))}
      </ul>

      <ExpenseForm tripId={tripId} />
      <ExpenseList tripId={tripId} />
    </div>

            {isEditing ? (
                <div>
                    <h3>Edit Trip Details</h3>
                    <form>
                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={updatedTrip.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Start Date:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={new Date(updatedTrip.startDate).toISOString().split('T')[0]}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={new Date(updatedTrip.endDate).toISOString().split('T')[0]}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={updatedTrip.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="button" onClick={handleUpdateTrip}>Save</button>
                        <button type="button" onClick={handleEditToggle}>Cancel</button>
                    </form>
                </div>
            ) : (
                <button onClick={handleEditToggle}>Edit Trip Details</button>
            )}
            
            <button onClick={() => navigate(`/itinerary/${tripId}`)}>View Itinerary</button>
        </div>
    );
};

export default Trip;
