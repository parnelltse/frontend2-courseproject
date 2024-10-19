import React from 'react';

export default function Login() {
    return (
        <div>
            <header>
                <h1>Matching Game</h1>
                <h2>Account Login</h2>
            </header>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

