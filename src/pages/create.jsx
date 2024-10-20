import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import AccountForm from '../components/AccountForm'; 

export default function Create() {
    const navigate = useNavigate(); 
    const handleAccountCreation = (data) => {
        console.log('Account created:', data);
        
        navigate('/home'); // Redirect to the home page
    };

    return (
        <div>
            <header>
                <h1>Matching Game</h1>
                <h2>Account Creation</h2>
            </header>
           
            <AccountForm onSubmit={handleAccountCreation} buttonText="Create Account" />
        </div>
    );
}
