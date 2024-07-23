import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ChatList() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            const token = document.cookie.split("; ").find(row => row.startsWith("token=")).split('=')[1];
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/chats/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        fetchChats();
    }, []);

    return (
        <div className="chat-list">
            <h2>Your Chats</h2>
            <ul>
                {chats.map(chat => (
                    <li key={chat.token}>
                        <Link to={`/chat/${chat.token}`}>
                            Chat with {chat.users.join(', ')}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;
