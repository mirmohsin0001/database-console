const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Important for cross-origin requests
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json());

// MongoDB Connection (replace with your MongoDB URI)
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://root:root@book-store-mern.mfuqgka.mongodb.net/?retryWrites=true&w=majority&appName=Book-Store-MERN';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const dataSchema = new mongoose.Schema({
    ipAddress: String,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now },
});

const Data = mongoose.model('Data', dataSchema, 'datas'); // 'your_collection_name' is important!

// API endpoint to get all data
app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.find({}); // Fetch all data from the collection
        res.json(data); // Send the data as JSON
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));