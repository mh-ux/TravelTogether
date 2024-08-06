import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import itineraryService from '../services/itineraryService';

const Itinerary = () => {
    const { itineraryId } = useParams();
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        eventName: '',
        type: 'dining',
        dates: [''],
        links: [''],
        description: '',
    });

    useEffect(() => {
        if (itineraryId) {
            const fetchItinerary = async () => {
                try {
                    const response = await itineraryService.getItinerary(itineraryId);
                    setItems(response.data.items);
                } catch (error) {
                    console.error('Error fetching itinerary', error);
                }
            };
            fetchItinerary();
        } else {
            console.error('itineraryId is undefined');
        }
    }, [itineraryId]);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const updatedItems = Array.from(items);
        const [reorderedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, reorderedItem);

        setItems(updatedItems);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!itineraryId) {
            console.error('itineraryId is undefined');
            return;
        }
        const item = { ...newItem, order: items.length };
        try {
            const response = await itineraryService.addItem(itineraryId, item);
            setItems(response.data.items);
            setNewItem({
                eventName: '',
                type: 'dining',
                dates: [''],
                links: [''],
                description: '',
            });
        } catch (error) {
            console.error('Error adding item', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    const handleDateChange = (index, value) => {
        const dates = [...newItem.dates];
        dates[index] = value;
        setNewItem((prevItem) => ({ ...prevItem, dates }));
    };

    const handleAddDate = () => {
        setNewItem((prevItem) => ({ ...prevItem, dates: [...prevItem.dates, ''] }));
    };

    const handleLinkChange = (index, value) => {
        const links = [...newItem.links];
        links[index] = value;
        setNewItem((prevItem) => ({ ...prevItem, links }));
    };

    const handleAddLink = () => {
        setNewItem((prevItem) => ({ ...prevItem, links: [...prevItem.links, ''] }));
    };

    return (
        <div>
            <h2>Itinerary</h2>
            <form onSubmit={handleAddItem}>
                <input
                    type="text"
                    name="eventName"
                    placeholder="Event Name"
                    value={newItem.eventName}
                    onChange={handleInputChange}
                    required
                />
                <select name="type" value={newItem.type} onChange={handleInputChange}>
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
                            onChange={(e) => handleDateChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddDate}>Add Date</button>
                {newItem.links.map((link, index) => (
                    <div key={index}>
                        <input
                            type="url"
                            placeholder="Link"
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddLink}>Add Link</button>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={handleInputChange}
                ></textarea>
                <button type="submit">Add Item</button>
            </form>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="itinerary">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <h3>{item.eventName}</h3>
                                            <p>Type: {item.type}</p>
                                            <p>Description: {item.description}</p>
                                            <p>Dates: {item.dates.join(', ')}</p>
                                            <p>Links: {item.links.join(', ')}</p>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Itinerary;
