// src/pages/CalendarView.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import itineraryService from '../services/itineraryService';

const localizer = momentLocalizer(moment);

const CalendarView = ({ itineraryId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const response = await itineraryService.getItinerary(itineraryId);
                const items = response.data.items.map((item, index) => ({
                    id: item._id,
                    title: item.content,
                    start: moment().add(index, 'days').toDate(),
                    end: moment().add(index, 'days').add(1, 'hour').toDate(),
                }));
                setEvents(items);
            } catch (error) {
                console.error('Error fetching itinerary', error);
            }
        };

        fetchItinerary();
    }, [itineraryId]);

    return (
        <div>
            <h2>Itinerary Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    );
};

export default CalendarView;
