const express = require("express"),
    app = express(),
    PORT = 5000,
    connectDB = require('./config/db');

// Connect to database

connectDB();

app.use(express.json({ extended: false }));

// Define routes

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => {
    console.log("Listening on: " + PORT)
})