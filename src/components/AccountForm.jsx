// AccountForm.jsx
import React, { useState } from 'react';

const AccountForm = ({ onSubmit, buttonText }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSubmit) {
            onSubmit({ username, password });
        }
        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{buttonText}</button> 
        </form>
    );
};

export default AccountForm;
