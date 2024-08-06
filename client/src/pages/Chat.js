// src/pages/Chat.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import chatService from '../services/chatService';

const socket = io('http://localhost:5000'); // Ensure this matches your server URL and port

const Chat = ({ groupId }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await chatService.getMessages(groupId);
            setMessages(response.data);
        };

        fetchMessages();
    }, [groupId]);

    useEffect(() => {
        socket.emit('joinGroup', groupId);

        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('message');
        };
    }, [groupId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message) return;
        const newMessage = { groupId, content: message };
        await chatService.sendMessage(newMessage);
        socket.emit('message', newMessage);
        setMessage('');
    };

    return (
        <div>
            <h2>Group Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.senderId.name}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
