import React from 'react';
import AccountForm from '../components/AccountForm'

const Login = () => {
    const handleLogin = (data) => {
        console.log('User logged in:', data);
    };

    return (
        <div style={{ padding: '20px' }}>
            <header>
                <h1>Matching Game</h1>
                <h2>Login</h2>
            </header>
            <AccountForm onSubmit={handleLogin} buttonText="Login" />
        </div>
    );
};

export default Login;

