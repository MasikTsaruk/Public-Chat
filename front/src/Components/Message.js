import React from 'react';

function Message({ text, email, received }) {
    return (
        <div className={`message ${received ? 'received' : 'sent'}`}>
            <span className="message-email">{email}</span>
            <p className="message-text">{text}</p>
        </div>
    );
}

export default Message;
