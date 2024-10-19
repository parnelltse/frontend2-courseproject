import React from 'react';
import AccountForm from '../components/AccountForm'

export default function Create() {
    const handleAccountCreation = (data) => {
        console.log('Account created:', data); 
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
