import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://database-console-2.onrender.com/api/data'); // Use relative URL if frontend and backend are on the same domain/server
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Data from MongoDB</h1>
            <ol>
                {data.map(item => (
                    <li key={item._id}> {/* Use _id as the key */}
                        <p>IP Address: {item.ipAddress}</p>
                        <p>Latitude: {item.latitude}</p>
                        <p>Longitude: {item.longitude}</p>
                        <p>Timestamp: {item.timestamp}</p> {/* Display your data fields */} <br />
                    </li>

                ))}
            </ol>
        </div>
    );
}

export default App;
