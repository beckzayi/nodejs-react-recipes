const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

// Connects to database
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB connected ...'))
    .catch(err => console.error(err));

// Initializes application
const app = express();

// for cross domain request
app.use(cors());

app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets, like our main.js file, or main.css file.
    app.use(express.static('client/build'));
  
    // Express will serve up the index.html if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT} ...`);
});
