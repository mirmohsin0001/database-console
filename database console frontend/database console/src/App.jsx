import React, { useState, useEffect } from 'react';
import './App.css'
import downArrow from './assets/downArrow.png'
import upArrow from './assets/upArrow.png'

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

                const sortedData = jsonData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setData(sortedData);

            } catch (err) {
                console.error("Fetch error:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <img width={32} onClick={scrollToBottom} className='scrollDownBtn' src={downArrow} />
            <img width={32} onClick={scrollToTop} className='scrollUpBtn' src={upArrow} />
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
