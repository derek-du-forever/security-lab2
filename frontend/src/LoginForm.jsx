import React, { useState } from 'react';

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (!username?.trim()) {
            setError('Please enter a username.');
            return;
        }
        if (!password?.trim()) {
            setError('Please enter a password.');
            return;
        }
        if (!username?.trim().includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3333/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.uuid) {
                setToken(data.uuid);
            } else {
                setError(data.message || 'Login failed. Check credentials.');
            }
        } catch (err) {
            setError('Server connection failed.');
        }
    };

    return (
        <div className="login-container">
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    className="login-input"
                    type="text"
                    placeholder="Username (Email)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;