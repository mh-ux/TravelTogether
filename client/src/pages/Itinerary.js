import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Itinerary = () => {
    const { tripId } = useParams();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({
        eventName: '',
        type: '',
        dates: '',
        time: '',
        links: '',
        description: '',
        pictures: []
    });
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error('No auth token found');
                }

                console.log(`Fetching itinerary for Trip ID: ${tripId}`); // Log the Trip ID
                const response = await axios.get(`http://localhost:5000/api/itineraries/trip/${tripId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setItinerary(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching itinerary:', error);
                setError(error.message || 'Error fetching itinerary');
                setLoading(false);
            }
        };

        fetchItinerary();
    }, [tripId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleFileChange = (e) => {
        setPicture(e.target.files[0]);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No auth token found');
            }

            const formData = new FormData();
            formData.append('eventName', newItem.eventName);
            formData.append('type', newItem.type);
            formData.append('dates', newItem.dates);
            formData.append('time', newItem.time);
            formData.append('links', newItem.links);
            formData.append('description', newItem.description);
            if (picture) {
                formData.append('picture', picture);
            }

            const response = await axios.post(`http://localhost:5000/api/itineraries/trip/${tripId}/add-item`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setItinerary(response.data);
            setShowForm(false);
            setNewItem({
                eventName: '',
                type: '',
                dates: '',
                time: '',
                links: '',
                description: '',
                pictures: []
            });
            setPicture(null);
        } catch (error) {
            console.error('Error adding itinerary item:', error);
            setError(error.message || 'Error adding itinerary item');
        }
    };

    const handleEditItem = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No auth token found');
            }

            const formData = new FormData();
            formData.append('eventName', newItem.eventName);
            formData.append('type', newItem.type);
            formData.append('dates', newItem.dates);
            formData.append('time', newItem.time);
            formData.append('links', newItem.links);
            formData.append('description', newItem.description);
            if (picture) {
                formData.append('picture', picture);
            }

            const response = await axios.put(`http://localhost:5000/api/itineraries/trip/${tripId}/item/${editItem}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setItinerary(response.data);
            setShowForm(false);
            setNewItem({
                eventName: '',
                type: '',
                dates: '',
                time: '',
                links: '',
                description: '',
                pictures: []
            });
            setEditItem(null);
            setPicture(null);
        } catch (error) {
            console.error('Error editing itinerary item:', error);
            setError(error.message || 'Error editing itinerary item');
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No auth token found');
            }

            const response = await axios.delete(`http://localhost:5000/api/itineraries/trip/${tripId}/item/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setItinerary(response.data);
        } catch (error) {
            console.error('Error deleting itinerary item:', error);
            setError(error.message || 'Error deleting itinerary item');
        }
    };

    const handleEditClick = (item) => {
        setEditItem(item._id);
        setNewItem({
            eventName: item.eventName,
            type: item.type,
            dates: item.dates,
            time: item.time,
            links: item.links.join(', '),
            description: item.description,
            pictures: item.pictures
        });
        setShowForm(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!itinerary) {
        return <div>Itinerary not found</div>;
    }

    return (
        <div>
            <h1>Itinerary for Trip ID: {itinerary.tripId}</h1>
            {itinerary.items.map(item => (
                <div key={item._id}>
                    <h2>{item.eventName}</h2>
                    <p>Type: {item.type}</p>
                    <p>Date: {formatDate(item.dates)}</p>
                    <p>Time: {item.time}</p>
                    <p>{item.description}</p>
                    <p>{item.links.join(', ')}</p>
                    {item.pictures && item.pictures.map((pic, index) => (
                        <img key={index} src={`http://localhost:5000/uploads/${pic}`} alt={`pic-${index}`} />
                    ))}
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                    <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                </div>
            ))}

            <button onClick={() => setShowForm(!showForm)}>Add Itinerary Item</button>

            {showForm && (
                <form onSubmit={editItem ? handleEditItem : handleAddItem}>
                    <div>
                        <label>Event Name:</label>
                        <input
                            type="text"
                            name="eventName"
                            value={newItem.eventName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <select name="type" value={newItem.type} onChange={handleInputChange} required>
                            <option value="">Select Type</option>
                            <option value="dining">Dining</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="lodging">Lodging</option>
                            <option value="miscellaneous">Miscellaneous</option>
                            <option value="transportation">Transportation</option>
                        </select>
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            name="dates"
                            value={newItem.dates}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Time:</label>
                        <input
                            type="time"
                            name="time"
                            value={newItem.time}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Links:</label>
                        <input
                            type="text"
                            name="links"
                            value={newItem.links}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={newItem.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div>
                        <label>Picture:</label>
                        <input
                            type="file"
                            name="picture"
                            accept="image/jpeg"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit">{editItem ? 'Update Item' : 'Add Item'}</button>
                </form>
            )}
        </div>
    );
};

export default Itinerary;
