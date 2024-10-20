import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton'; 

export default function ProfileSettings() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); 
    const [submittedUsername, setSubmittedUsername] = useState(""); // State to hold the submitted username

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedUsername(username); // Update the submitted username
        console.log("Username submitted:", username);
    };

    return (
        <div>
            {/* Show the username if it has been submitted */}
            {submittedUsername && (
                <h2>{submittedUsername}</h2>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <button type="submit">Save</button>
            </form>

            <button onClick={() => navigate('/gamehistory')}>
                Scores
            </button>
            <BackButton />
        </div>
    );
}
