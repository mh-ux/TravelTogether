import axios from 'axios';

const API_URL = 'http://localhost:5000/api/trips';

const createTrip = (tripData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(`${API_URL}/create`, tripData, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
};

const getTrips = () => {
    return axios.get(API_URL, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` },
    });
};

const getTripById = (tripId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/${tripId}`, {
        headers: { Authorization: `Bearer ${user.token}` },    });
};

const updateTrip = (tripId, tripData) => {
    return axios.put(`${API_URL}/${tripId}`, tripData, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` },
    });
};

const tripService =  {
    createTrip,
    getTrips,
    getTripById,
    updateTrip,
};

export default tripService;
