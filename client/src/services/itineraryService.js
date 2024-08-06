import axios from 'axios';

const API_URL = 'http://localhost:5000/api/itineraries';

const createItinerary = (tripId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(
        `${API_URL}/create`,
        { tripId },
        {
            headers: { Authorization: `Bearer ${user.token}` },
        }
    );
};

const addItem = (itineraryId, item) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(
        `${API_URL}/add`,
        { itineraryId, item },
        {
            headers: { Authorization: `Bearer ${user.token}` },
        }
    );
};

const updateItem = (itineraryId, itemId, item) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.put(
        `${API_URL}/update`,
        { itineraryId, itemId, item },
        {
            headers: { Authorization: `Bearer ${user.token}` },
        }
    );
};

const deleteItem = (itineraryId, itemId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.delete(
        `${API_URL}/delete`,
        {
            data: { itineraryId, itemId },
            headers: { Authorization: `Bearer ${user.token}` },
        }
    );
};

const getItinerary = (itineraryId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(`${API_URL}/${itineraryId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
};

const itineraryService = {
    createItinerary,
    addItem,
    updateItem,
    deleteItem,
    getItinerary,
};

export default itineraryService;
