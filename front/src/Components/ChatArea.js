import React, { useState, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

function ChatArea() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const tokenCookie = document.cookie.split("; ").find(row => row.startsWith("token="));
        if (!tokenCookie) {
            console.error("Token not found in cookies");
            return;
        }
        const token = tokenCookie.split('=')[1];

        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${token}`);

        ws.onopen = () => {
            console.log("WebSocket connection opened");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        ws.onclose = (event) => {
            console.error("WebSocket connection closed", event);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error", error);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []); // Зависимость от пустого массива, чтобы соединение открывалось один раз

    const sendMessage = (message) => {
        if (socket) {
            socket.send(JSON.stringify({ message }));
        }
    };

    return (
        <div className="chat-area">
            <div className="chat-header">Chat</div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.message} email={msg.email} received />
                ))}
            </div>
            <MessageInput sendMessage={sendMessage} />
        </div>
    );
}

export default ChatArea;
