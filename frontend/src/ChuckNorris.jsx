import React, { useState, useEffect } from 'react';

const ChuckNorris = ({ token }) => {
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFact = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3333/facts', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setFact(data.fact);
            } catch (err) {
                setFact('Failed to load fact.');
            } finally {
                setLoading(false);
            }
        };

        fetchFact();
    }, [token]);

    return (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
            <h3>Chuck Norris Fact:</h3>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <p>{fact}</p>
            )}
        </div>
    );
};

export default ChuckNorris;