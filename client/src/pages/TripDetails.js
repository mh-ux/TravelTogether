import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import itineraryService from '../services/itineraryService';
import tripService from '../services/tripService';

const TripDetails = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({
        eventName: '',
        type: 'dining',
        dates: [''],
        links: [''],
        description: '',
    });

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const response = await tripService.getTripById(tripId);
                console.log('Fetched trip:', response.data);
                setTrip(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching trip:', error);
                setLoading(false);
            }
        };

        fetchTrip();
    }, [tripId]);

    const handleAddItem = async (e) => {
        e.preventDefault();
        console.log('Trip in handleAddItem:', trip);
        if (!trip || !trip.itinerary || !trip.itinerary.items) {
            console.error('Trip or itinerary not found');
            return;
        }
        const item = { ...newItem, order: trip.itinerary.items.length || 0 };
        try {
            const response = await itineraryService.addItem(trip.itinerary._id, item);
            setTrip({ ...trip, itinerary: response.data });
            setNewItem({
                eventName: '',
                type: 'dining',
                dates: [''],
                links: [''],
                description: '',
            });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!trip) {
        return <div>Trip not found</div>;
    }

    return (
        <div>
            <h2>Trip Details: {trip.title}</h2>
            <p>{trip.description}</p>
            <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(trip.endDate).toLocaleDateString()}</p>
            <h3>Itinerary</h3>
            {trip.itinerary && (
                <div>
                    <form onSubmit={handleAddItem}>
                        <input
                            type="text"
                            name="eventName"
                            placeholder="Event Name"
                            value={newItem.eventName}
                            onChange={(e) => setNewItem({ ...newItem, eventName: e.target.value })}
                            required
                        />
                        <select name="type" value={newItem.type} onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}>
                            <option value="dining">Dining</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="lodging">Lodging</option>
                            <option value="miscellaneous">Miscellaneous</option>
                            <option value="transportation">Transportation</option>
                        </select>
                        {newItem.dates.map((date, index) => (
                            <div key={index}>
                                <input
                                    type="datetime-local"
                                    value={date}
                                    onChange={(e) => {
                                        const dates = [...newItem.dates];
                                        dates[index] = e.target.value;
                                        setNewItem({ ...newItem, dates });
                                    }}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={() => setNewItem({ ...newItem, dates: [...newItem.dates, ''] })}>Add Date</button>
                        {newItem.links.map((link, index) => (
                            <div key={index}>
                                <input
                                    type="url"
                                    placeholder="Link"
                                    value={link}
                                    onChange={(e) => {
                                        const links = [...newItem.links];
                                        links[index] = e.target.value;
                                        setNewItem({ ...newItem, links });
                                    }}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={() => setNewItem({ ...newItem, links: [...newItem.links, ''] })}>Add Link</button>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        ></textarea>
                        <button type="submit">Add Item</button>
                    </form>
                    {trip.itinerary.items && trip.itinerary.items.length > 0 ? (
                        <ul>
                            {trip.itinerary.items.map((item, index) => (
                                <li key={index}>
                                    <h4>{item.eventName}</h4>
                                    <p>Type: {item.type}</p>
                                    <p>Description: {item.description}</p>
                                    <p>Dates: {item.dates.join(', ')}</p>
                                    <p>Links: {item.links.join(', ')}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No items in itinerary</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TripDetails;
