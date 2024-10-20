import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import AccountForm from '../components/AccountForm'

const Login = () => {
    const navigate = useNavigate(); 
    const handleLogin = (data) => {
        console.log('User logged in:', data);

        navigate('/home'); // Redirect to the home page

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

